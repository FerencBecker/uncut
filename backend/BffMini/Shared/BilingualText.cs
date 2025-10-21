using System.Text.Json.Serialization;

namespace BffMini.Shared;

public record BilingualText
{
    [JsonPropertyName("hu")]
    public string Hungarian { get; init; } = string.Empty;

    [JsonPropertyName("en")]
    public string English { get; init; } = string.Empty;
}
