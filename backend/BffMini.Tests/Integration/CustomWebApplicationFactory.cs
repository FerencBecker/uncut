using Microsoft.AspNetCore.Mvc.Testing;

namespace BffMini.Tests.Integration;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((context, config) =>
        {
            var projectDir = Directory.GetCurrentDirectory();
            var dataPath = Path.Combine(projectDir, "..", "..", "..", "..", "..", "data", "sample");

            config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["DataPaths:Studios"] = Path.Combine(dataPath, "studios"),
                ["DataPaths:Images"] = Path.Combine(dataPath, "images"),
                ["DataPaths:Manifests"] = Path.Combine(dataPath, "manifests"),
                ["Cors:AllowedOrigins:0"] = "http://localhost:3000"
            });
        });

        builder.UseEnvironment("Development");
    }
}
