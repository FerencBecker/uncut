using System.Text.Json.Serialization;

namespace BffMini.Models;

public class BilingualText
{
    [JsonPropertyName("hu")]
    public string Hungarian { get; set; } = string.Empty;

    [JsonPropertyName("en")]
    public string? English { get; set; }

    public BilingualText() { }

    public BilingualText(string hungarian, string? english = null)
    {
        Hungarian = hungarian;
        English = english;
    }

    public string GetText(string language = "hu")
    {
        return language.ToLowerInvariant() switch
        {
            "en" => English ?? Hungarian,
            _ => Hungarian
        };
    }

    public override string ToString() => Hungarian;
}
