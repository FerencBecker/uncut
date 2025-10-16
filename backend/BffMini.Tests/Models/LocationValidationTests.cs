using System.ComponentModel.DataAnnotations;
using BffMini.Models;
using Xunit;

namespace BffMini.Tests.Models;

public class LocationValidationTests
{
    [Fact]
    public void Location_WithValidCoordinates_PassesValidation()
    {
        // Arrange
        var location = new Location
        {
            PlaceName = new BilingualText("Budapest", "Budapest"),
            Latitude = 47.4979,
            Longitude = 19.0402
        };

        // Act
        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(location, new ValidationContext(location), validationResults, true);

        // Assert
        Assert.True(isValid);
        Assert.Empty(validationResults);
    }

    [Theory]
    [InlineData(45.5, 18.0)] // Too far south
    [InlineData(49.0, 18.0)] // Too far north
    public void Location_WithInvalidLatitude_FailsValidation(double latitude, double longitude)
    {
        // Arrange
        var location = new Location
        {
            PlaceName = new BilingualText("Invalid Location", "Invalid Location"),
            Latitude = latitude,
            Longitude = longitude
        };

        // Act
        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(location, new ValidationContext(location), validationResults, true);

        // Assert
        Assert.False(isValid);
        Assert.Contains(validationResults, vr => vr.ErrorMessage!.Contains("Latitude"));
    }

    [Theory]
    [InlineData(47.0, 15.0)] // Too far west
    [InlineData(47.0, 23.5)] // Too far east
    public void Location_WithInvalidLongitude_FailsValidation(double latitude, double longitude)
    {
        // Arrange
        var location = new Location
        {
            PlaceName = new BilingualText("Invalid Location", "Invalid Location"),
            Latitude = latitude,
            Longitude = longitude
        };

        // Act
        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(location, new ValidationContext(location), validationResults, true);

        // Assert
        Assert.False(isValid);
        Assert.Contains(validationResults, vr => vr.ErrorMessage!.Contains("Longitude"));
    }

    [Fact]
    public void Location_WithOnlyLatitude_FailsValidation()
    {
        // Arrange
        var location = new Location
        {
            PlaceName = new BilingualText("Incomplete Location", "Incomplete Location"),
            Latitude = 47.4979
        };

        // Act
        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(location, new ValidationContext(location), validationResults, true);

        // Assert
        Assert.False(isValid);
        Assert.Contains(validationResults, vr => vr.ErrorMessage!.Contains("Both latitude and longitude"));
    }

    [Fact]
    public void Location_WithOnlyLongitude_FailsValidation()
    {
        // Arrange
        var location = new Location
        {
            PlaceName = new BilingualText("Incomplete Location", "Incomplete Location"),
            Longitude = 19.0402
        };

        // Act
        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(location, new ValidationContext(location), validationResults, true);

        // Assert
        Assert.False(isValid);
        Assert.Contains(validationResults, vr => vr.ErrorMessage!.Contains("Both latitude and longitude"));
    }

    [Fact]
    public void Location_WithoutCoordinates_PassesValidation()
    {
        // Arrange - coordinates are optional if both are null
        var location = new Location
        {
            PlaceName = new BilingualText("No Coordinates", "No Coordinates")
        };

        // Act
        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(location, new ValidationContext(location), validationResults, true);

        // Assert
        Assert.True(isValid);
        Assert.Empty(validationResults);
    }
}
