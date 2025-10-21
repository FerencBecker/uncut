using Microsoft.AspNetCore.Mvc;

namespace BffMini.Manifest;

public static class Endpoints
{
    public static void MapManifestEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/manifests")
            .WithTags("Manifests");

        group.MapGet("/studio/{studioId}", GetByStudioId)
            .WithName("GetStudioImagesManifest")
            .WithSummary("Get the curated image ordering for a specific studio's gallery")
            .Produces<ImagesManifest>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);
    }

    private static async Task<IResult> GetByStudioId(
        string studioId,
        [FromServices] Repository repository,
        [FromServices] ILogger<Program> logger)
    {
        try
        {
            var manifest = await repository.GetByStudioIdAsync(studioId);
            return Results.Ok(manifest);
        }
        catch (FileNotFoundException)
        {
            return Results.NotFound(new { message = $"Image manifest for studio '{studioId}' not found" });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving image manifest for studio {StudioId}", studioId);
            return Results.Problem(title: "Error retrieving image manifest", statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}
