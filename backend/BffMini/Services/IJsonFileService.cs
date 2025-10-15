namespace BffMini.Services;

/// <summary>
/// Service for reading and writing JSON files using atomic operations
/// </summary>
public interface IJsonFileService
{
    /// <summary>
    /// Reads a JSON file and deserializes it to the specified type
    /// </summary>
    /// <typeparam name="T">The type to deserialize to</typeparam>
    /// <param name="filePath">Relative path to the JSON file</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Deserialized object or null if file doesn't exist</returns>
    Task<T?> ReadJsonFileAsync<T>(string filePath, CancellationToken cancellationToken = default) where T : class;

    /// <summary>
    /// Writes an object to a JSON file using atomic temp-to-rename strategy
    /// </summary>
    /// <typeparam name="T">The type to serialize</typeparam>
    /// <param name="filePath">Relative path to the JSON file</param>
    /// <param name="data">Object to serialize</param>
    /// <param name="cancellationToken">Cancellation token</param>
    Task WriteJsonFileAsync<T>(string filePath, T data, CancellationToken cancellationToken = default) where T : class;

    /// <summary>
    /// Checks if a JSON file exists
    /// </summary>
    /// <param name="filePath">Relative path to the JSON file</param>
    /// <returns>True if file exists, false otherwise</returns>
    bool FileExists(string filePath);

    /// <summary>
    /// Gets all files matching a pattern
    /// </summary>
    /// <param name="pattern">Search pattern (e.g., "*.json")</param>
    /// <param name="searchSubdirectories">Whether to search subdirectories</param>
    /// <returns>Array of file paths</returns>
    string[] GetFiles(string pattern, bool searchSubdirectories = false);
}
