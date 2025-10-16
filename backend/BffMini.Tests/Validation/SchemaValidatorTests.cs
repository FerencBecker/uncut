using BffMini.Models;
using BffMini.Validation;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace BffMini.Tests.Validation;

public class SchemaValidatorTests
{
    private readonly SchemaValidator _validator;
    private readonly Mock<ILogger<SchemaValidator>> _mockLogger;

    public SchemaValidatorTests()
    {
        _mockLogger = new Mock<ILogger<SchemaValidator>>();
        _validator = new SchemaValidator(_mockLogger.Object);
    }

    [Fact]
    public async Task ValidateAsync_WithValidObject_ReturnsSuccess()
    {
        var validLocation = new Location
        {
            PlaceName = new BilingualText("Budapest", "Budapest"),
            Latitude = 47.4979,
            Longitude = 19.0402
        };

        var result = await _validator.ValidateAsync(validLocation);

        Assert.True(result.IsValid);
        Assert.Empty(result.Errors);
    }

    [Fact]
    public async Task ValidateAsync_WithInvalidLatitude_ReturnsFailure()
    {
        var invalidLocation = new Location
        {
            PlaceName = new BilingualText("Invalid", "Invalid"),
            Latitude = 50.0,
            Longitude = 19.0
        };

        var result = await _validator.ValidateAsync(invalidLocation);

        Assert.False(result.IsValid);
        Assert.NotEmpty(result.Errors);
        Assert.Contains(result.Errors, e => e.Contains("Latitude"));
    }

    [Fact]
    public async Task ValidateAsync_WithPartialCoordinates_ReturnsFailure()
    {
        var invalidLocation = new Location
        {
            PlaceName = new BilingualText("Incomplete", "Incomplete"),
            Latitude = 47.4979
        };

        var result = await _validator.ValidateAsync(invalidLocation);

        Assert.False(result.IsValid);
        Assert.NotEmpty(result.Errors);
        Assert.Contains(result.Errors, e => e.Contains("Both latitude and longitude"));
    }

    [Fact]
    public async Task ValidateAsync_WithMissingRequiredFields_ReturnsFailure()
    {
        var invalidStudio = new Studio
        {
            Id = "",
            Photographer = new Photographer(),
            StudioAddress = new StudioAddress()
        };

        var result = await _validator.ValidateAsync(invalidStudio);

        Assert.False(result.IsValid);
        Assert.NotEmpty(result.Errors);
    }

    [Fact]
    public async Task ValidateJsonAsync_WithNonexistentSchema_ReturnsFailure()
    {
        var json = "{\"id\": \"test\"}";
        var schemaPath = "nonexistent-schema.json";

        var result = await _validator.ValidateJsonAsync(json, schemaPath);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.Contains("Schema file not found"));
    }

    [Fact]
    public async Task ValidateJsonAsync_WithInvalidJson_ReturnsFailure()
    {
        var invalidJson = "{invalid json}";
        var projectRoot = Path.GetFullPath(Path.Combine(
            Directory.GetCurrentDirectory(),
            "..", "..", "..", "..", ".."
        ));
        var schemaPath = Path.Combine(projectRoot, "data", "schemas", "studio-schema.json");

        var result = await _validator.ValidateJsonAsync(invalidJson, schemaPath);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.Contains("Invalid JSON format") || e.Contains("JSON"));
    }

    [Fact]
    public async Task ValidateJsonAsync_WithValidJson_ReturnsSuccess()
    {
        var validJson = @"{
            ""id"": ""test-studio"",
            ""version"": ""1.0.0"",
            ""photographer"": {
                ""name"": {
                    ""hu"": ""Test Photographer""
                }
            },
            ""studioAddress"": {
                ""city"": {
                    ""hu"": ""Budapest""
                }
            }
        }";

        var projectRoot = Path.GetFullPath(Path.Combine(
            Directory.GetCurrentDirectory(),
            "..", "..", "..", "..", ".."
        ));
        var schemaPath = Path.Combine(projectRoot, "data", "schemas", "studio-schema.json");

        Assert.True(File.Exists(schemaPath), $"Schema file not found at: {schemaPath}");

        var result = await _validator.ValidateJsonAsync(validJson, schemaPath);

        Assert.True(result.IsValid);
        Assert.Empty(result.Errors);
    }

    [Fact]
    public async Task ValidateJsonAsync_WithInvalidSchema_ReturnsFailure()
    {
        var invalidJson = @"{
            ""id"": ""test-studio""
        }";

        var projectRoot = Path.GetFullPath(Path.Combine(
            Directory.GetCurrentDirectory(),
            "..", "..", "..", "..", ".."
        ));
        var schemaPath = Path.Combine(projectRoot, "data", "schemas", "studio-schema.json");

        Assert.True(File.Exists(schemaPath), $"Schema file not found at: {schemaPath}");

        var result = await _validator.ValidateJsonAsync(invalidJson, schemaPath);

        Assert.False(result.IsValid);
        Assert.NotEmpty(result.Errors);
    }
}
