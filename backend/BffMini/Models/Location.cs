using System.Text.Json.Serialization;

namespace BffMini.Models;

public class Location
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

public class Coordinates
{
    [JsonPropertyName("latitude")]
    public double Latitude { get; init; }

    [JsonPropertyName("longitude")]
    public double Longitude { get; init; }
}
