using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Nodes;
using Json.Schema;

namespace BffMini.Validation;

public class SchemaValidator : ISchemaValidator
{
    private readonly ILogger<SchemaValidator> _logger;

    public SchemaValidator(ILogger<SchemaValidator> logger)
    {
        _logger = logger;
    }

    public Task<ValidationResult> ValidateAsync<T>(T instance, CancellationToken cancellationToken = default) where T : class
    {
        var context = new ValidationContext(instance);
        var validationResults = new List<System.ComponentModel.DataAnnotations.ValidationResult>();

        bool isValid = Validator.TryValidateObject(instance, context, validationResults, validateAllProperties: true);

        if (isValid)
        {
            return Task.FromResult(ValidationResult.Success());
        }

        var errors = validationResults
            .Select(vr => vr.ErrorMessage ?? "Unknown validation error")
            .ToArray();

        _logger.LogWarning("Validation failed for {TypeName}: {Errors}",
            typeof(T).Name,
            string.Join(", ", errors));

        return Task.FromResult(ValidationResult.Failure(errors));
    }

    public async Task<ValidationResult> ValidateJsonAsync(string json, string schemaPath, CancellationToken cancellationToken = default)
    {
        try
        {
            if (!File.Exists(schemaPath))
            {
                _logger.LogError("Schema file not found: {SchemaPath}", schemaPath);
                return ValidationResult.Failure($"Schema file not found: {schemaPath}");
            }

            var schemaJson = await File.ReadAllTextAsync(schemaPath, cancellationToken);
            var schema = JsonSchema.FromText(schemaJson);

            var jsonNode = JsonNode.Parse(json);
            if (jsonNode == null)
            {
                _logger.LogError("Failed to parse JSON");
                return ValidationResult.Failure("Failed to parse JSON as JsonNode");
            }

            var validationResults = schema.Evaluate(jsonNode, new EvaluationOptions
            {
                OutputFormat = OutputFormat.List
            });

            if (validationResults.IsValid)
            {
                _logger.LogDebug("JSON validation successful against schema: {SchemaPath}", schemaPath);
                return ValidationResult.Success();
            }

            var errors = validationResults.Details
                .Where(d => !d.IsValid)
                .Select(d => $"{d.InstanceLocation}: {d.Errors?.FirstOrDefault().Value ?? "Validation failed"}")
                .ToArray();

            _logger.LogWarning("JSON validation failed against schema {SchemaPath}: {Errors}",
                schemaPath,
                string.Join(", ", errors));

            return ValidationResult.Failure(errors);
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Invalid JSON format");
            return ValidationResult.Failure($"Invalid JSON format: {ex.Message}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Schema validation error");
            return ValidationResult.Failure($"Schema validation error: {ex.Message}");
        }
    }
}
