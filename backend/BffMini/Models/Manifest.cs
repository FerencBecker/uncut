using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BffMini.Models;

/// <summary>
/// Defines the curated display order of images for a studio's gallery.
/// One manifest file per studio containing ordered array of image IDs.
/// </summary>
public class ImagesManifest
{
    [JsonPropertyName("studioId")]
    [Required]
    public string StudioId { get; init; } = string.Empty;

    [JsonPropertyName("imageIds")]
    [Required]
    public string[] ImageIds { get; init; } = [];

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; init; } = DateTime.UtcNow;
}
