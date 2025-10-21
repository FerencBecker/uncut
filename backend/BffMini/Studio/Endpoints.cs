using Microsoft.AspNetCore.Mvc;

namespace BffMini.Studio;

public static class Endpoints
{
    public static void MapStudiosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/studios")
            .WithTags("Studios");

        group.MapGet("/", GetAll)
            .WithName("GetAllStudios")
            .WithSummary("Get all photography studios")
            .Produces<Studio[]>(StatusCodes.Status200OK);

        group.MapGet("/{id}", GetById)
            .WithName("GetStudioById")
            .WithSummary("Get a specific studio by ID")
            .Produces<Studio>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);

        group.MapGet("/city/{city}", GetByCity)
            .WithName("GetStudiosByCity")
            .WithSummary("Get studios by city name")
            .Produces<Studio[]>(StatusCodes.Status200OK);
    }

    private static async Task<IResult> GetAll(
        [FromServices] Repository repository,
        [FromServices] ILogger<Program> logger)
    {
        try
        {
            var studios = await repository.GetAllAsync();
            return Results.Ok(studios);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving all studios");
            return Results.Problem(title: "Error retrieving studios", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetById(
        string id,
        [FromServices] Repository repository,
        [FromServices] ILogger<Program> logger)
    {
        try
        {
            var studio = await repository.GetByIdAsync(id);
            return Results.Ok(studio);
        }
        catch (FileNotFoundException)
        {
            return Results.NotFound(new { message = $"Studio '{id}' not found" });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving studio {StudioId}", id);
            return Results.Problem(title: "Error retrieving studio", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetByCity(
        string city,
        [FromServices] Repository repository,
        [FromServices] ILogger<Program> logger)
    {
        try
        {
            var studios = await repository.GetByCityAsync(city);
            return Results.Ok(studios);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving studios for city {City}", city);
            return Results.Problem(title: "Error retrieving studios by city", statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}
