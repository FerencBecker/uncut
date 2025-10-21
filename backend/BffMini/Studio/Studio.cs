using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using BffMini.Shared;

namespace BffMini.Studio;

public record Studio
{
    [JsonPropertyName("id")]
    [Required]
    public int Id { get; init; }

    [JsonPropertyName("photographer")]
    [Required]
    public Photographer Photographer { get; init; } = new();

    [JsonPropertyName("studioAddress")]
    [Required]
    public StudioAddress StudioAddress { get; init; } = new();

    [JsonPropertyName("operatingPeriod")]
    public OperatingPeriod? OperatingPeriod { get; init; }

    [JsonPropertyName("characteristics")]
    public StudioCharacteristics Characteristics { get; init; } = new();

    [JsonPropertyName("catchmentArea")]
    public string[] CatchmentArea { get; init; } = [];

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; init; } = DateTime.UtcNow;
}

public record Photographer
{
    [JsonPropertyName("name")]
    [Required]
    public BilingualText Name { get; init; } = new();

    [JsonPropertyName("birthYear")]
    public int? BirthYear { get; init; }

    [JsonPropertyName("deathYear")]
    public int? DeathYear { get; init; }
}

public record StudioAddress
{
    [JsonPropertyName("street")]
    public BilingualText Street { get; init; } = new();

    [JsonPropertyName("city")]
    [Required]
    public BilingualText City { get; init; } = new();

    [JsonPropertyName("location")]
    public Location? Location { get; init; }
}

public record OperatingPeriod
{
    [JsonPropertyName("startYear")]
    public int? StartYear { get; init; }

    [JsonPropertyName("endYear")]
    public int? EndYear { get; init; }
}

public record StudioCharacteristics
{
    [JsonPropertyName("signatureStyle")]
    public BilingualText SignatureStyle { get; init; } = new();

    [JsonPropertyName("specialties")]
    public BilingualText[] Specialties { get; init; } = [];
}
