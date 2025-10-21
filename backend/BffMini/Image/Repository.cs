using System.Text.Json;
using BffMini.Shared;
using Microsoft.Extensions.Options;

namespace BffMini.Image;

public class Repository(IOptions<DataPathsOptions> options)
{
    private readonly string _dataDirectory = options.Value.Images;

    public async Task<Image[]> GetAllAsync()
    {
        var files = Directory.GetFiles(_dataDirectory, "*.json");
        return await Task.WhenAll(files.Select(GetImageAsync));
    }

    public async Task<Image> GetByIdAsync(int id)
    {
        var filePath = Path.Combine(_dataDirectory, $"{id}.json");
        return await GetImageAsync(filePath);
    }

    public async Task<IEnumerable<Image>> GetByStudioIdAsync(int studioId)
    {
        var allImages = await GetAllAsync();
        return allImages
            .Where(i => i.StudioId == studioId);
    }

    private static async Task<Image> GetImageAsync(string filePath)
    {
        var json = await File.ReadAllTextAsync(filePath);
        var image = JsonSerializer.Deserialize<Image>(json, JsonOptions.Default);
        return image ?? throw new InvalidOperationException($"Failed to deserialize image from {filePath}");
    }
}
