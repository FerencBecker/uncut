using System.Text.Json;
using BffMini.Shared;
using Microsoft.Extensions.Options;

namespace BffMini.Studio;

public class Repository(IOptions<DataPathsOptions> options)
{
    private readonly string _dataDirectory = options.Value.Studios;

    public async Task<Studio[]> GetAllAsync()
    {
        var files = Directory.GetFiles(_dataDirectory, "*.json");
        return await Task.WhenAll(files.Select(GetStudioAsync));
    }

    public async Task<Studio> GetByIdAsync(string id)
    {
        var filePath = Path.Combine(_dataDirectory, $"{id}.json");
        return await GetStudioAsync(filePath);
    }

    public async Task<IEnumerable<Studio>> GetByCityAsync(string city)
    {
        var allStudios = await GetAllAsync();
        return allStudios
            .Where(s => s.StudioAddress.City.Hungarian.Equals(city, StringComparison.OrdinalIgnoreCase) ||
                       s.StudioAddress.City.English.Equals(city, StringComparison.OrdinalIgnoreCase));
    }

    private static async Task<Studio> GetStudioAsync(string filePath)
    {
        var json = await File.ReadAllTextAsync(filePath);
        var studio = JsonSerializer.Deserialize<Studio>(json, JsonOptions.Default);
        return studio ?? throw new InvalidOperationException($"Failed to deserialize studio from {filePath}");
    }
}
