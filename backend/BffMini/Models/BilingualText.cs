using System.Text.Json.Serialization;

namespace BffMini.Models;

public class BilingualText
{
    [JsonPropertyName("hu")]
    public string Hungarian { get; init; } = string.Empty;

    [JsonPropertyName("en")]
    public string English { get; init; } = string.Empty;
}
