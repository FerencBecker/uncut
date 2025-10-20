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
        // TODO: Register repository services when implemented (Issue #50)
        return services;
    }
}
