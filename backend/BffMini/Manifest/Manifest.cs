using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BffMini.Manifest;

/// <summary>
/// Defines the curated display order of images for a studio's gallery.
/// One manifest file per studio containing ordered array of image IDs.
/// </summary>
public record ImagesManifest
{
    [JsonPropertyName("studioId")]
    [Required]
    public int StudioId { get; init; }

    [JsonPropertyName("imageIds")]
    [Required]
    public int[] ImageIds { get; init; } = [];

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; init; } = DateTime.UtcNow;
}
