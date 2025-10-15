using BffMini.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace BffMini.Tests.Services;

public class JsonFileServiceTests : IDisposable
{
    private readonly string _testDataPath;
    private readonly JsonFileService _service;
    private readonly Mock<ILogger<JsonFileService>> _mockLogger;

    public JsonFileServiceTests()
    {
        // Create a temporary directory for tests
        _testDataPath = Path.Combine(Path.GetTempPath(), $"bffmini-tests-{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testDataPath);

        var options = Options.Create(new FileServiceOptions
        {
            DataPath = _testDataPath,
            CacheEnabled = false
        });

        _mockLogger = new Mock<ILogger<JsonFileService>>();
        _service = new JsonFileService(options, _mockLogger.Object);
    }

    [Fact]
    public async Task ReadJsonFileAsync_WhenFileDoesNotExist_ReturnsNull()
    {
        // Act
        var result = await _service.ReadJsonFileAsync<TestData>("nonexistent.json");

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task WriteJsonFileAsync_CreatesFileWithCorrectContent()
    {
        // Arrange
        var testData = new TestData { Id = 1, Name = "Test" };
        var fileName = "test.json";

        // Act
        await _service.WriteJsonFileAsync(fileName, testData);

        // Assert
        var result = await _service.ReadJsonFileAsync<TestData>(fileName);
        Assert.NotNull(result);
        Assert.Equal(testData.Id, result.Id);
        Assert.Equal(testData.Name, result.Name);
    }

    [Fact]
    public async Task WriteJsonFileAsync_UsesAtomicOperation()
    {
        // Arrange
        var testData = new TestData { Id = 1, Name = "Original" };
        var fileName = "atomic-test.json";

        // Act
        await _service.WriteJsonFileAsync(fileName, testData);
        var updatedData = new TestData { Id = 1, Name = "Updated" };
        await _service.WriteJsonFileAsync(fileName, updatedData);

        // Assert - No temp files should remain
        var files = Directory.GetFiles(_testDataPath, "*.tmp.*");
        Assert.Empty(files);

        var result = await _service.ReadJsonFileAsync<TestData>(fileName);
        Assert.NotNull(result);
        Assert.Equal("Updated", result.Name);
    }

    [Fact]
    public void FileExists_WhenFileExists_ReturnsTrue()
    {
        // Arrange
        var fileName = "exists.json";
        var filePath = Path.Combine(_testDataPath, fileName);
        File.WriteAllText(filePath, "{}");

        // Act
        var result = _service.FileExists(fileName);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void FileExists_WhenFileDoesNotExist_ReturnsFalse()
    {
        // Act
        var result = _service.FileExists("nonexistent.json");

        // Assert
        Assert.False(result);
    }

    [Fact]
    public void GetFiles_ReturnsMatchingFiles()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testDataPath, "file1.json"), "{}");
        File.WriteAllText(Path.Combine(_testDataPath, "file2.json"), "{}");
        File.WriteAllText(Path.Combine(_testDataPath, "file3.txt"), "text");

        // Act
        var result = _service.GetFiles("*.json");

        // Assert
        Assert.Equal(2, result.Length);
        Assert.Contains(result, f => f.Contains("file1.json"));
        Assert.Contains(result, f => f.Contains("file2.json"));
    }

    public void Dispose()
    {
        // Clean up test directory
        if (Directory.Exists(_testDataPath))
        {
            Directory.Delete(_testDataPath, recursive: true);
        }
    }

    private class TestData
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
