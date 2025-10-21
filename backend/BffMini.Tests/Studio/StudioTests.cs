using System.Net;
using System.Text.Json;
using BffMini.Shared;
using BffMini.Tests.Integration;
using Xunit;

namespace BffMini.Tests.Studio;

public class StudioTests(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
{
    [Fact]
    public async Task GetAllStudios_ReturnsOkWithStudios()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/studios");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var studios = JsonSerializer.Deserialize<BffMini.Studio.Studio[]>(content, JsonOptions.Default);

        Assert.NotNull(studios);
        Assert.NotEmpty(studios);
    }

    [Fact]
    public async Task GetStudioById_ExistingStudio_ReturnsOk()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/studios/1");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var studio = JsonSerializer.Deserialize<BffMini.Studio.Studio>(content, JsonOptions.Default);

        Assert.NotNull(studio);
        Assert.Equal(1, studio.Id);
    }

    [Fact]
    public async Task GetStudioById_NonExistingStudio_ReturnsNotFound()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/studios/999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetStudiosByCity_ExistingCity_ReturnsOk()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/studios/city/Dombóvár");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var studios = JsonSerializer.Deserialize<BffMini.Studio.Studio[]>(content, JsonOptions.Default);

        Assert.NotNull(studios);
        Assert.NotEmpty(studios);
        Assert.All(studios, studio =>
            Assert.True(studio.StudioAddress.City.Hungarian == "Dombóvár" || studio.StudioAddress.City.English == "Dombóvár"));
    }

    [Fact]
    public async Task GetStudiosByCity_NonExistingCity_ReturnsEmptyArray()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/studios/city/NonExistingCity");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var studios = JsonSerializer.Deserialize<BffMini.Studio.Studio[]>(content, JsonOptions.Default);

        Assert.NotNull(studios);
        Assert.Empty(studios);
    }

    [Fact]
    public async Task GetAllStudios_ReturnsJsonContentType()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/studios");

        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
    }
}
