using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using BffMini.Shared;

namespace BffMini.Image;

public record Image
{
    [JsonPropertyName("id")]
    [Required]
    public string Id { get; init; } = string.Empty;

    [JsonPropertyName("studioId")]
    [Required]
    public string StudioId { get; init; } = string.Empty;

    [JsonPropertyName("inventoryNumber")]
    [Required]
    public string InventoryNumber { get; init; } = string.Empty;

    [JsonPropertyName("museumCatalogNumber")]
    public string MuseumCatalogNumber { get; init; } = string.Empty;

    [JsonPropertyName("title")]
    public BilingualText Title { get; init; } = new();

    [JsonPropertyName("description")]
    [Required]
    public BilingualText Description { get; init; } = new();

    [JsonPropertyName("shootingLocation")]
    public ShootingLocation ShootingLocation { get; init; } = new();

    [JsonPropertyName("dateTaken")]
    public DateTaken? DateTaken { get; init; }

    [JsonPropertyName("technical")]
    public TechnicalMetadata Technical { get; init; } = new();

    [JsonPropertyName("subjects")]
    public string[] Subjects { get; init; } = [];

    [JsonPropertyName("photographerSignatureVisible")]
    public bool PhotographerSignatureVisible { get; init; }

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; init; } = DateTime.UtcNow;
}

public record ShootingLocation
{
    [JsonPropertyName("placeName")]
    [Required]
    public BilingualText PlaceName { get; init; } = new();

    [JsonPropertyName("location")]
    public Location? Location { get; init; }
}

public record DateTaken
{
    [JsonPropertyName("year")]
    public int? Year { get; init; }

    [JsonPropertyName("yearRangeStart")]
    public int? YearRangeStart { get; init; }

    [JsonPropertyName("yearRangeEnd")]
    public int? YearRangeEnd { get; init; }

    [JsonPropertyName("precision")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public DatePrecision Precision { get; init; } = DatePrecision.Approximate;
}

public enum DatePrecision
{
    Exact,
    Approximate,
    Decade,
    Unknown
}

public record TechnicalMetadata
{
    [JsonPropertyName("medium")]
    public BilingualText Medium { get; init; } = new();

    [JsonPropertyName("format")]
    public BilingualText Format { get; init; } = new();

    [JsonPropertyName("dimensions")]
    public Dimensions Dimensions { get; init; } = new();
}

public record Dimensions
{
    [JsonPropertyName("width")]
    public double? Width { get; init; }

    [JsonPropertyName("height")]
    public double? Height { get; init; }

    [JsonPropertyName("unit")]
    public string Unit { get; init; } = "cm";
}
