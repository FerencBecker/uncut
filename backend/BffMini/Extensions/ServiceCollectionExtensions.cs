using BffMini.Studio;
using BffMini.Image;
using BffMini.Manifest;

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
        services.AddSingleton<Studio.Repository>();
        services.AddSingleton<Image.Repository>();
        services.AddSingleton<Manifest.Repository>();
        return services;
    }
}
