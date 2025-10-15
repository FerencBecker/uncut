using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BffMini.Models;

public class Studio
{
    [JsonPropertyName("id")]
    [Required]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("version")]
    public string Version { get; set; } = "1.0.0";

    [JsonPropertyName("photographer")]
    [Required]
    public Photographer Photographer { get; set; } = new();

    [JsonPropertyName("studioAddress")]
    [Required]
    public StudioAddress StudioAddress { get; set; } = new();

    [JsonPropertyName("operatingPeriod")]
    public OperatingPeriod? OperatingPeriod { get; set; }

    [JsonPropertyName("characteristics")]
    public StudioCharacteristics? Characteristics { get; set; }

    [JsonPropertyName("collection")]
    public CollectionInfo? Collection { get; set; }

    [JsonPropertyName("catchmentArea")]
    public List<string>? CatchmentArea { get; set; }

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Photographer
{
    [JsonPropertyName("name")]
    [Required]
    public BilingualText Name { get; set; } = new();

    [JsonPropertyName("birthYear")]
    public int? BirthYear { get; set; }

    [JsonPropertyName("deathYear")]
    public int? DeathYear { get; set; }

    public override string ToString() => Name.Hungarian;
}

public class StudioAddress
{
    [JsonPropertyName("street")]
    public BilingualText? Street { get; set; }

    [JsonPropertyName("city")]
    [Required]
    public BilingualText City { get; set; } = new();

    [JsonPropertyName("location")]
    public Location? Location { get; set; }

    public override string ToString() => City.Hungarian;
}

public class OperatingPeriod
{
    [JsonPropertyName("startYear")]
    public int? StartYear { get; set; }

    [JsonPropertyName("endYear")]
    public int? EndYear { get; set; }

    public override string ToString()
    {
        if (StartYear.HasValue && EndYear.HasValue)
            return $"{StartYear}–{EndYear}";
        if (StartYear.HasValue)
            return $"{StartYear}–";
        if (EndYear.HasValue)
            return $"–{EndYear}";
        return "Unknown";
    }
}

public class StudioCharacteristics
{
    [JsonPropertyName("signatureStyle")]
    public BilingualText? SignatureStyle { get; set; }

    [JsonPropertyName("backdrop")]
    public BilingualText? Backdrop { get; set; }

    [JsonPropertyName("specialties")]
    public List<BilingualText>? Specialties { get; set; }
}

public class CollectionInfo
{
    [JsonPropertyName("totalImages")]
    public int TotalImages { get; set; }

    [JsonPropertyName("inventoryRangeStart")]
    public string? InventoryRangeStart { get; set; }

    [JsonPropertyName("inventoryRangeEnd")]
    public string? InventoryRangeEnd { get; set; }
}
