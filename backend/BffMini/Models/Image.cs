using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BffMini.Models;

public class Image
{
    [JsonPropertyName("id")]
    [Required]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("version")]
    public string Version { get; set; } = "1.0.0";

    [JsonPropertyName("studioId")]
    [Required]
    public string StudioId { get; set; } = string.Empty;

    [JsonPropertyName("inventoryNumber")]
    [Required]
    public string InventoryNumber { get; set; } = string.Empty;

    [JsonPropertyName("museumCatalogNumber")]
    public string? MuseumCatalogNumber { get; set; }

    [JsonPropertyName("title")]
    public BilingualText? Title { get; set; }

    [JsonPropertyName("description")]
    [Required]
    public BilingualText Description { get; set; } = new();

    [JsonPropertyName("shootingLocation")]
    public ShootingLocation? ShootingLocation { get; set; }

    [JsonPropertyName("dateTaken")]
    public DateTaken? DateTaken { get; set; }

    [JsonPropertyName("technical")]
    public TechnicalMetadata? Technical { get; set; }

    [JsonPropertyName("subjects")]
    public string[] Subjects { get; set; } = Array.Empty<string>();

    [JsonPropertyName("photographerSignatureVisible")]
    public bool PhotographerSignatureVisible { get; set; }

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class ShootingLocation
{
    [JsonPropertyName("placeName")]
    [Required]
    public BilingualText PlaceName { get; set; } = new();

    [JsonPropertyName("location")]
    public Location? Location { get; set; }
}

public class DateTaken
{
    [JsonPropertyName("year")]
    public int? Year { get; set; }

    [JsonPropertyName("yearRangeStart")]
    public int? YearRangeStart { get; set; }

    [JsonPropertyName("yearRangeEnd")]
    public int? YearRangeEnd { get; set; }

    [JsonPropertyName("precision")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public DatePrecision Precision { get; set; } = DatePrecision.Approximate;
}

public enum DatePrecision
{
    Exact,
    Approximate,
    Decade,
    Unknown
}

public class TechnicalMetadata
{
    [JsonPropertyName("medium")]
    public BilingualText? Medium { get; set; }

    [JsonPropertyName("format")]
    public BilingualText? Format { get; set; }

    [JsonPropertyName("dimensions")]
    public Dimensions? Dimensions { get; set; }
}

public class Dimensions
{
    [JsonPropertyName("width")]
    public double Width { get; set; }

    [JsonPropertyName("height")]
    public double Height { get; set; }

    [JsonPropertyName("unit")]
    public string Unit { get; set; } = "cm";
}
