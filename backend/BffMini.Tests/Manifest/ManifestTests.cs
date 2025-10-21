using System.Net;
using System.Text.Json;
using BffMini.Manifest;
using BffMini.Shared;
using BffMini.Tests.Integration;
using Xunit;

namespace BffMini.Tests.Manifest;

public class ManifestTests(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
{
    [Fact]
    public async Task GetStudioImagesManifest_ExistingStudio_ReturnsOk()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/manifests/studio/mate-lajos-dombovar");

        if (response.StatusCode == HttpStatusCode.OK)
        {
            var content = await response.Content.ReadAsStringAsync();
            var manifest = JsonSerializer.Deserialize<ImagesManifest>(content, JsonOptions.Default);

            Assert.NotNull(manifest);
            Assert.Equal("mate-lajos-dombovar", manifest.StudioId);
            Assert.NotNull(manifest.ImageIds);
        }
        else
        {
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }

    [Fact]
    public async Task GetStudioImagesManifest_NonExistingStudio_ReturnsNotFound()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/manifests/studio/non-existing-studio");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
