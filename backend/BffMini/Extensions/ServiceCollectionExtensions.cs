using BffMini.Services;

namespace BffMini.Extensions;

/// <summary>
/// Extension methods for configuring BffMini services
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Adds BffMini services to the dependency injection container
    /// </summary>
    public static IServiceCollection AddBffMiniServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Configure file service options
        services.Configure<FileServiceOptions>(
            configuration.GetSection("FileService"));

        // Register services
        services.AddSingleton<IJsonFileService, JsonFileService>();

        return services;
    }
}
