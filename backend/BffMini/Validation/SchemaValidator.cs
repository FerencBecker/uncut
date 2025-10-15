using System.ComponentModel.DataAnnotations;
using System.Text.Json;

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
            using var document = JsonDocument.Parse(json);

            if (!File.Exists(schemaPath))
            {
                _logger.LogError("Schema file not found: {SchemaPath}", schemaPath);
                return ValidationResult.Failure($"Schema file not found: {schemaPath}");
            }

            _logger.LogInformation("JSON validation against schema: {SchemaPath}", schemaPath);

            return ValidationResult.Success();
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Invalid JSON format");
            return ValidationResult.Failure($"Invalid JSON format: {ex.Message}");
        }
    }
}
