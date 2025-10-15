using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BffMini.Models;

public class Location : IValidatableObject
{
    [JsonPropertyName("placeName")]
    public BilingualText PlaceName { get; set; } = new();

    [JsonPropertyName("latitude")]
    public double? Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public double? Longitude { get; set; }

    [JsonPropertyName("region")]
    public BilingualText? Region { get; set; }

    [JsonPropertyName("county")]
    public BilingualText? County { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Latitude.HasValue && (Latitude < 45.7 || Latitude > 48.6))
        {
            yield return new ValidationResult(
                "Latitude must be within Hungary's boundaries (45.7° - 48.6° N)",
                new[] { nameof(Latitude) });
        }

        if (Longitude.HasValue && (Longitude < 16.1 || Longitude > 22.9))
        {
            yield return new ValidationResult(
                "Longitude must be within Hungary's boundaries (16.1° - 22.9° E)",
                new[] { nameof(Longitude) });
        }

        if ((Latitude.HasValue && !Longitude.HasValue) || (!Latitude.HasValue && Longitude.HasValue))
        {
            yield return new ValidationResult(
                "Both latitude and longitude must be provided together",
                new[] { nameof(Latitude), nameof(Longitude) });
        }
    }

    public override string ToString() => PlaceName.Hungarian;
}
