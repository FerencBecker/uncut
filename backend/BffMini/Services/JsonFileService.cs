using System.Text.Json;
using Microsoft.Extensions.Options;

namespace BffMini.Services;

public class FileServiceOptions
{
    public string DataPath { get; set; } = "data";
    public bool CacheEnabled { get; set; } = true;
    public int CacheDurationMinutes { get; set; } = 60;
}

/// <summary>
/// JSON file service with atomic operations using temp-to-rename strategy
/// </summary>
public class JsonFileService : IJsonFileService
{
    private readonly string _dataPath;
    private readonly ILogger<JsonFileService> _logger;
    private readonly JsonSerializerOptions _jsonOptions;

    public JsonFileService(
        IOptions<FileServiceOptions> options,
        ILogger<JsonFileService> logger)
    {
        _dataPath = Path.GetFullPath(options.Value.DataPath);
        _logger = logger;
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        // Ensure data directory exists
        if (!Directory.Exists(_dataPath))
        {
            Directory.CreateDirectory(_dataPath);
            _logger.LogInformation("Created data directory at {DataPath}", _dataPath);
        }
    }

    public async Task<T?> ReadJsonFileAsync<T>(string filePath, CancellationToken cancellationToken = default) where T : class
    {
        var fullPath = GetFullPath(filePath);

        if (!File.Exists(fullPath))
        {
            _logger.LogWarning("File not found: {FilePath}", fullPath);
            return null;
        }

        try
        {
            using var fileStream = new FileStream(
                fullPath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.Read,
                bufferSize: 4096,
                useAsync: true);

            var result = await JsonSerializer.DeserializeAsync<T>(fileStream, _jsonOptions, cancellationToken);

            _logger.LogDebug("Successfully read JSON file: {FilePath}", fullPath);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reading JSON file: {FilePath}", fullPath);
            throw;
        }
    }

    public async Task WriteJsonFileAsync<T>(string filePath, T data, CancellationToken cancellationToken = default) where T : class
    {
        var fullPath = GetFullPath(filePath);
        var directory = Path.GetDirectoryName(fullPath);

        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        // Atomic write using temp-to-rename strategy
        var tempPath = $"{fullPath}.tmp.{Guid.NewGuid():N}";

        try
        {
            // Write to temporary file
            using (var fileStream = new FileStream(
                tempPath,
                FileMode.Create,
                FileAccess.Write,
                FileShare.None,
                bufferSize: 4096,
                useAsync: true))
            {
                await JsonSerializer.SerializeAsync(fileStream, data, _jsonOptions, cancellationToken);
                await fileStream.FlushAsync(cancellationToken);
            }

            // Atomic rename (replaces existing file if present)
            File.Move(tempPath, fullPath, overwrite: true);

            _logger.LogDebug("Successfully wrote JSON file: {FilePath}", fullPath);
        }
        catch (Exception ex)
        {
            // Clean up temp file on error
            if (File.Exists(tempPath))
            {
                try { File.Delete(tempPath); } catch { }
            }

            _logger.LogError(ex, "Error writing JSON file: {FilePath}", fullPath);
            throw;
        }
    }

    public bool FileExists(string filePath)
    {
        var fullPath = GetFullPath(filePath);
        return File.Exists(fullPath);
    }

    public string[] GetFiles(string pattern, bool searchSubdirectories = false)
    {
        try
        {
            var searchOption = searchSubdirectories ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;
            var files = Directory.GetFiles(_dataPath, pattern, searchOption);

            // Return relative paths
            return files.Select(f => Path.GetRelativePath(_dataPath, f)).ToArray();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting files with pattern: {Pattern}", pattern);
            return Array.Empty<string>();
        }
    }

    private string GetFullPath(string relativePath)
    {
        var fullPath = Path.Combine(_dataPath, relativePath);

        // Security: Ensure the path doesn't escape the data directory
        var normalizedPath = Path.GetFullPath(fullPath);
        if (!normalizedPath.StartsWith(_dataPath, StringComparison.OrdinalIgnoreCase))
        {
            throw new UnauthorizedAccessException($"Access to path outside data directory is denied: {relativePath}");
        }

        return normalizedPath;
    }
}
