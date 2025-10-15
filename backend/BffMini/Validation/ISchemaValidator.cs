namespace BffMini.Validation;

public interface ISchemaValidator
{
    Task<ValidationResult> ValidateAsync<T>(T instance, CancellationToken cancellationToken = default) where T : class;
    Task<ValidationResult> ValidateJsonAsync(string json, string schemaPath, CancellationToken cancellationToken = default);
}

public class ValidationResult
{
    public bool IsValid { get; set; }
    public List<string> Errors { get; set; } = new();

    public static ValidationResult Success() => new() { IsValid = true };
    public static ValidationResult Failure(params string[] errors) => new() { IsValid = false, Errors = errors.ToList() };
}
