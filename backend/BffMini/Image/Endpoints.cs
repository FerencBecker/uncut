using Microsoft.AspNetCore.Mvc;

namespace BffMini.Image;

public static class Endpoints
{
    public static void MapImagesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/images")
            .WithTags("Images");

        group.MapGet("/", GetAll)
            .WithName("GetAllImages")
            .WithSummary("Get all images")
            .Produces<Image[]>();

        group.MapGet("/{id}", GetById)
            .WithName("GetImageById")
            .WithSummary("Get a specific image by ID")
            .Produces<Image>()
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound);

        group.MapGet("/studio/{studioId}", GetByStudioId)
            .WithName("GetImagesByStudioId")
            .WithSummary("Get images for a specific studio")
            .Produces<Image[]>()
            .Produces(StatusCodes.Status400BadRequest);
    }

    private static async Task<IResult> GetAll(
        [FromServices] Repository repository,
        [FromServices] ILogger<Program> logger)
    {
        try
        {
            var images = await repository.GetAllAsync();
            return Results.Ok(images);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving all images");
            return Results.Problem(title: "Error retrieving images", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetById(
        int id,
        [FromServices] Repository repository,
        [FromServices] ILogger<Program> logger)
    {
        try
        {
            var image = await repository.GetByIdAsync(id);
            return Results.Ok(image);
        }
        catch (FileNotFoundException)
        {
            return Results.NotFound(new { message = "Image not found" });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving image");
            return Results.Problem(title: "Error retrieving image", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetByStudioId(
        int studioId,
        [FromServices] Repository repository,
        [FromServices] ILogger<Program> logger)
    {
        try
        {
            var images = await repository.GetByStudioIdAsync(studioId);
            return Results.Ok(images);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving images for studio");
            return Results.Problem(title: "Error retrieving images by studio", statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}
