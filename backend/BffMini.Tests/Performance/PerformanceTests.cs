using System.Diagnostics;
using System.Net;
using BffMini.Tests.Integration;
using Xunit;

namespace BffMini.Tests.Performance;

public class PerformanceTests(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
{
    private const int MaxResponseTimeMs = 2000; // Gallery loading requirement: <2s
    private const int MaxSingleImageMs = 500;   // Single image endpoint should be faster
    private const int MaxStudioMs = 500;        // Studio endpoint should be faster

    [Fact]
    public async Task GetStudioImagesManifest_MeetsPerformanceRequirement()
    {
        // Arrange
        var client = factory.CreateClient();
        var stopwatch = new Stopwatch();

        // Act
        stopwatch.Start();
        var response = await client.GetAsync("/api/manifests/studio/1");
        stopwatch.Stop();

        // Assert
        Assert.True(response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.NotFound,
            $"Expected OK or NotFound, got {response.StatusCode}");
        Assert.True(stopwatch.ElapsedMilliseconds < MaxResponseTimeMs,
            $"Gallery manifest loading took {stopwatch.ElapsedMilliseconds}ms, expected <{MaxResponseTimeMs}ms");
    }

    [Fact]
    public async Task GetStudio_MeetsPerformanceRequirement()
    {
        // Arrange
        var client = factory.CreateClient();
        var stopwatch = new Stopwatch();

        // Act
        stopwatch.Start();
        var response = await client.GetAsync("/api/studios/1");
        stopwatch.Stop();

        // Assert
        Assert.True(response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.NotFound,
            $"Expected OK or NotFound, got {response.StatusCode}");
        Assert.True(stopwatch.ElapsedMilliseconds < MaxStudioMs,
            $"Studio endpoint took {stopwatch.ElapsedMilliseconds}ms, expected <{MaxStudioMs}ms");
    }

    [Fact]
    public async Task GetImage_MeetsPerformanceRequirement()
    {
        // Arrange
        var client = factory.CreateClient();
        var stopwatch = new Stopwatch();

        // Act
        stopwatch.Start();
        var response = await client.GetAsync("/api/images/1");
        stopwatch.Stop();

        // Assert
        Assert.True(response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.NotFound,
            $"Expected OK or NotFound, got {response.StatusCode}");
        Assert.True(stopwatch.ElapsedMilliseconds < MaxSingleImageMs,
            $"Image endpoint took {stopwatch.ElapsedMilliseconds}ms, expected <{MaxSingleImageMs}ms");
    }

    [Fact]
    public async Task GetAllStudios_MeetsPerformanceRequirement()
    {
        // Arrange
        var client = factory.CreateClient();
        var stopwatch = new Stopwatch();

        // Act
        stopwatch.Start();
        var response = await client.GetAsync("/api/studios");
        stopwatch.Stop();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(stopwatch.ElapsedMilliseconds < MaxResponseTimeMs,
            $"Studios list endpoint took {stopwatch.ElapsedMilliseconds}ms, expected <{MaxResponseTimeMs}ms");
    }

    [Theory]
    [InlineData("/api/studios/1")]
    [InlineData("/api/images/1")]
    [InlineData("/api/manifests/studio/1")]
    public async Task MultipleRequests_ConsistentPerformance(string endpoint)
    {
        // Arrange
        var client = factory.CreateClient();
        var iterations = 10;
        var responseTimes = new List<long>();

        // Act
        for (int i = 0; i < iterations; i++)
        {
            var stopwatch = Stopwatch.StartNew();
            var response = await client.GetAsync(endpoint);
            stopwatch.Stop();

            Assert.True(response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.NotFound);
            responseTimes.Add(stopwatch.ElapsedMilliseconds);
        }

        // Assert - Check average and max response time
        var avgResponseTime = responseTimes.Average();
        var maxResponseTime = responseTimes.Max();

        Assert.True(avgResponseTime < MaxResponseTimeMs,
            $"Average response time {avgResponseTime}ms exceeds {MaxResponseTimeMs}ms");
        Assert.True(maxResponseTime < MaxResponseTimeMs * 1.5,
            $"Max response time {maxResponseTime}ms exceeds acceptable threshold");
    }
}
