using System.Text.Json.Serialization;

namespace BffMini.Shared;

public record Location
{
    [JsonPropertyName("placeName")]
    public BilingualText PlaceName { get; init; } = new();

    [JsonPropertyName("coordinates")]
    public Coordinates? Coordinates { get; init; }

    [JsonPropertyName("region")]
    public BilingualText Region { get; init; } = new();

    [JsonPropertyName("county")]
    public BilingualText County { get; init; } = new();
}

public record Coordinates
{
    [JsonPropertyName("latitude")]
    public double Latitude { get; init; }

    [JsonPropertyName("longitude")]
    public double Longitude { get; init; }
}
