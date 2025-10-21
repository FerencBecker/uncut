using System.Net;
using System.Text.Json;
using BffMini.Shared;
using BffMini.Tests.Integration;
using Xunit;

namespace BffMini.Tests.Image;

public class ImageTests(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
{
    [Fact]
    public async Task GetAllImages_ReturnsOkWithImages()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/images");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var images = JsonSerializer.Deserialize<BffMini.Image.Image[]>(content, JsonOptions.Default);

        Assert.NotNull(images);
        Assert.NotEmpty(images);
    }

    [Fact]
    public async Task GetImageById_ExistingImage_ReturnsOk()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/images/f41074");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var image = JsonSerializer.Deserialize<BffMini.Image.Image>(content, JsonOptions.Default);

        Assert.NotNull(image);
        Assert.Equal("f41074", image.Id);
    }

    [Fact]
    public async Task GetImageById_NonExistingImage_ReturnsNotFound()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/images/non-existing-image");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetImagesByStudioId_ExistingStudio_ReturnsOk()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/images/studio/mate-lajos-dombovar");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var images = JsonSerializer.Deserialize<BffMini.Image.Image[]>(content, JsonOptions.Default);

        Assert.NotNull(images);
        Assert.NotEmpty(images);
        Assert.All(images, image =>
            Assert.Equal("mate-lajos-dombovar", image.StudioId, ignoreCase: true));
    }

    [Fact]
    public async Task GetImagesByStudioId_NonExistingStudio_ReturnsEmptyArray()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/images/studio/non-existing-studio");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var images = JsonSerializer.Deserialize<BffMini.Image.Image[]>(content, JsonOptions.Default);

        Assert.NotNull(images);
        Assert.Empty(images);
    }

    [Fact]
    public async Task GetAllImages_ReturnsJsonContentType()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/images");

        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
    }
}
