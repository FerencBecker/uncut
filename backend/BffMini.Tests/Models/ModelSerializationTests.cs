using System.Text.Json;
using BffMini.Shared;
using BffMini.Studio;
using BffMini.Image;
using BffMini.Manifest;
using Xunit;

namespace BffMini.Tests.Models;

public class ModelSerializationTests
{
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    [Fact]
    public void BilingualText_SerializesCorrectly()
    {
        // Arrange
        var text = new BilingualText { Hungarian = "Máté Lajos", English = "Lajos Máté" };

        // Act
        var json = JsonSerializer.Serialize(text, _jsonOptions);
        var deserialized = JsonSerializer.Deserialize<BilingualText>(json, _jsonOptions);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal("Máté Lajos", deserialized.Hungarian);
        Assert.Equal("Lajos Máté", deserialized.English);
    }

    [Fact]
    public void Location_SerializesCorrectly()
    {
        // Arrange
        var location = new Location
        {
            PlaceName = new BilingualText { Hungarian = "Dombóvár", English = "Dombóvár" },
            Coordinates = new Coordinates { Latitude = 46.3761, Longitude = 18.1300 },
            County = new BilingualText { Hungarian = "Tolna", English = "Tolna" }
        };

        // Act
        var json = JsonSerializer.Serialize(location, _jsonOptions);
        var deserialized = JsonSerializer.Deserialize<Location>(json, _jsonOptions);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal("Dombóvár", deserialized.PlaceName.Hungarian);
        Assert.NotNull(deserialized.Coordinates);
        Assert.Equal(46.3761, deserialized.Coordinates.Latitude);
        Assert.Equal(18.1300, deserialized.Coordinates.Longitude);
    }

    [Fact]
    public void Studio_SerializesCorrectly()
    {
        // Arrange
        var studio = new BffMini.Studio.Studio
        {
            Id = 1,
            Photographer = new Photographer
            {
                Name = new BilingualText { Hungarian = "Máté Lajos", English = "Lajos Máté" },
                BirthYear = 1896,
                DeathYear = 1937
            },
            StudioAddress = new StudioAddress
            {
                City = new BilingualText { Hungarian = "Dombóvár", English = "Dombóvár" },
                Street = new BilingualText { Hungarian = "Esterházy utca 7.", English = "7 Esterházy Street" }
            },
            OperatingPeriod = new OperatingPeriod
            {
                StartYear = 1921,
                EndYear = 1937
            }
        };

        // Act
        var json = JsonSerializer.Serialize(studio, _jsonOptions);
        var deserialized = JsonSerializer.Deserialize<BffMini.Studio.Studio>(json, _jsonOptions);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal(1, deserialized.Id);
        Assert.Equal("Máté Lajos", deserialized.Photographer.Name.Hungarian);
        Assert.Equal(1896, deserialized.Photographer.BirthYear);
        Assert.Equal(1921, deserialized.OperatingPeriod?.StartYear);
    }

    [Fact]
    public void Image_SerializesCorrectly()
    {
        // Arrange
        var image = new BffMini.Image.Image
        {
            Id = 1,
            StudioId = 1,
            InventoryNumber = "F41074",
            MuseumCatalogNumber = "NM F 41074",
            Description = new BilingualText
            {
                Hungarian = "Szüreti mulatság népies ruhába öltözött társasága",
                English = "Members of grape harvest festival in Hungarian costume"
            },
            ShootingLocation = new ShootingLocation
            {
                PlaceName = new BilingualText { Hungarian = "Szakcs", English = "Szakcs" }
            },
            DateTaken = new DateTaken
            {
                YearRangeStart = 1920,
                YearRangeEnd = 1921,
                Precision = DatePrecision.Approximate
            },
            Technical = new TechnicalMetadata
            {
                Medium = new BilingualText { Hungarian = "üvegnegatív", English = "glass negative" },
                Format = new BilingualText { Hungarian = "fekete-fehér", English = "black-and-white" },
                Dimensions = new Dimensions { Width = 10, Height = 15, Unit = "cm" }
            },
            PhotographerSignatureVisible = true
        };

        // Act
        var json = JsonSerializer.Serialize(image, _jsonOptions);
        var deserialized = JsonSerializer.Deserialize<BffMini.Image.Image>(json, _jsonOptions);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal(1, deserialized.Id);
        Assert.Equal(1, deserialized.StudioId);
        Assert.Equal("F41074", deserialized.InventoryNumber);
        Assert.Equal("NM F 41074", deserialized.MuseumCatalogNumber);
        Assert.True(deserialized.PhotographerSignatureVisible);
    }

    [Fact]
    public void ImagesManifest_SerializesCorrectly()
    {
        // Arrange
        var manifest = new ImagesManifest
        {
            StudioId = 1,
            ImageIds = [1, 2, 3]
        };

        // Act
        var json = JsonSerializer.Serialize(manifest, _jsonOptions);
        var deserialized = JsonSerializer.Deserialize<ImagesManifest>(json, _jsonOptions);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal(1, deserialized.StudioId);
        Assert.Equal(3, deserialized.ImageIds.Length);
        Assert.Equal(1, deserialized.ImageIds[0]);
        Assert.Equal(2, deserialized.ImageIds[1]);
        Assert.Equal(3, deserialized.ImageIds[2]);
    }
}
