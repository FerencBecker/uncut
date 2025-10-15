using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BffMini.Models;

public class Manifest
{
    [JsonPropertyName("version")]
    public string Version { get; set; } = "1.0.0";

    [JsonPropertyName("type")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ManifestType Type { get; set; }

    [JsonPropertyName("totalCount")]
    public int TotalCount { get; set; }

    [JsonPropertyName("items")]
    [Required]
    public ManifestItem[] Items { get; set; } = Array.Empty<ManifestItem>();

    [JsonPropertyName("lastUpdated")]
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}

public enum ManifestType
{
    Studios,
    Images
}

public class ManifestItem
{
    [JsonPropertyName("id")]
    [Required]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("order")]
    public int Order { get; set; }

    [JsonPropertyName("featured")]
    public bool Featured { get; set; }

    [JsonPropertyName("metadata")]
    public Dictionary<string, object>? Metadata { get; set; }
}
