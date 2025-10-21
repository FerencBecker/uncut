using System.Text.Json;
using BffMini.Shared;
using Microsoft.Extensions.Options;

namespace BffMini.Manifest;

public class Repository(IOptions<DataPathsOptions> options)
{
    private readonly string _manifestsDirectory = options.Value.Manifests;

    public async Task<ImagesManifest> GetByStudioIdAsync(int studioId)
    {
        var filePath = Path.Combine(_manifestsDirectory, $"{studioId}.json");
        return await GetManifestAsync(filePath);
    }

    private static async Task<ImagesManifest> GetManifestAsync(string filePath)
    {
        var json = await File.ReadAllTextAsync(filePath);
        var manifest = JsonSerializer.Deserialize<ImagesManifest>(json, JsonOptions.Default);
        return manifest ?? throw new InvalidOperationException($"Failed to deserialize manifest from {filePath}");
    }
}
