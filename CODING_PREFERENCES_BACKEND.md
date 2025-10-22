# Backend Coding Preferences (C# / .NET)

Coding patterns for Vertical Slice Architecture backend projects. These preferences balance pragmatism, maintainability, and minimalism.

## Development Approach

**Concise, Functional Code Style**

Prefer declarative LINQ over imperative loops. Use short, clear names leveraging context.

```csharp
// ✅ Concise functional style
public async Task<Product[]> GetAllAsync()
{
    var files = Directory.GetFiles(_dataDirectory, "*.json");
    return await Task.WhenAll(files.Select(GetProductAsync));
}
```

**Principles:**
- Use LINQ (`Select`, `Where`) over `foreach` when transforming collections
- Short local names - context makes meaning clear (`files` not `jsonFilePathList`)
- Eliminate intermediate variables - LINQ produces results directly
- Bonus: `Task.WhenAll` + `Select` parallelizes async operations

**Vertical Slice Architecture**

Organize by domain feature, not technical layer. Each slice is independent and self-contained.

```
backend/
├── Shared/                      # Shared value objects across slices
│   └── Money.cs
├── Order/                       # Order vertical slice
│   ├── Order.cs                 # Domain entity + value objects
│   ├── Repository.cs
│   └── Endpoints.cs
├── Product/                     # Product vertical slice
│   ├── Product.cs
│   ├── Repository.cs
│   └── Endpoints.cs
```

**Placement rules:**
- Slice-specific entities: Inside their slice (`Order.cs` in `/Order`)
- Shared value objects: In `/Shared` when used across multiple slices
- Entity-specific value objects: Same file as parent entity (until file >400 lines)

**Principles:**
- Each task delivers working feature, not infrastructure
- Repository methods emerge from endpoint requirements
- Use singular folder names (`Order/` not `Orders/`)
- Prevents speculative code built before features need it

## Naming Conventions Within Slices

Namespace provides context - don't repeat it in class/method names.

| Context                  | Avoid             | Prefer                 | Rationale                                             |
|--------------------------|-------------------|------------------------|-------------------------------------------------------|
| Class names              | `OrderRepository` | `Repository`           | Namespace already says `Order`                        |
| Repository methods       | `GetAllOrders()`  | `GetAllAsync()`        | Type `Order.Repository` provides context              |
| Private endpoint methods | `GetAllOrders()`  | `GetAll()`             | Class scope provides context                          |
| Extension methods        | `MapEndpoints()`  | `MapOrdersEndpoints()` | Call site sees `IEndpointRouteBuilder`, not namespace |
| Cross-domain refs        | `GetAll()`        | `GetByOrderIdAsync()`  | External domain name needed for clarity               |

**DI Registration (namespace-qualified):**
```csharp
services.AddSingleton<Order.Repository>();
services.AddSingleton<Product.Repository>();
```

## Dependency Injection Without Interfaces

Use concrete classes when there's only one implementation. Don't create interfaces for "future flexibility."

```csharp
// Registration
services.AddSingleton<Order.Repository>();

// Usage (inject concrete class)
private static async Task<IResult> GetAll(
    Repository repository,  // Concrete class, not IRepository
    ILogger logger)
{
    return Results.Ok(await repository.GetAllAsync());
}
```

**When to use interfaces:**
- Multiple implementations exist (`IPaymentProvider` → `StripeProvider`, `PayPalProvider`)
- External dependencies requiring test doubles (third-party APIs)
- Cross-assembly abstractions

**Testing:** Test entire slice with real implementations, not mocks.

## Data Modeling

**Use Records for Domain Models**

```csharp
public record Order { ... }
public record Product { ... }
public record Money { ... }
```

Benefits: Immutability, value equality for testing, concise syntax, with-expressions.

**Null Object Pattern**
- Non-nullable objects with empty defaults when object always exists conceptually
- Nullable complex objects when absence has clear semantic meaning
- Nullable primitives at leaf level (`int?`, `DateTime?`) for unknown/absent values
- Never nullable: collections, strings

Example: `Address` → Non-nullable with empty defaults. `ShippingDate` → `DateTime?` for unknown.

## Data Access

**Repository Pattern Within Slices**

Repositories encapsulate data access with business-focused operations (`GetByCity()`), not storage mechanics (`ReadJsonFile()`).

- Registered as singletons (stateless, thread-safe)
- No interfaces when single implementation (see DI section)

**Shared Infrastructure**

Centralize technical infrastructure (JSON options, HTTP clients), duplicate domain logic.

```csharp
// Shared/JsonOptions.cs
public static class JsonOptions
{
    public static readonly JsonSerializerOptions Default = new()
    {
        PropertyNameCaseInsensitive = true
    };
}

// Order/Repository.cs - use shared infrastructure
private async Task<Order> GetAsync(string filePath)
{
    var json = await File.ReadAllTextAsync(filePath);
    return JsonSerializer.Deserialize<Order>(json, JsonOptions.Default)
        ?? throw new InvalidOperationException($"Failed to deserialize from {filePath}");
}
```

## Exception Handling and Logging

**Repositories: Pure data access, no logging**

Repositories don't catch exceptions or log. Let exceptions propagate to endpoints.

```csharp
public class Repository(IConfiguration configuration)
{
    private readonly string _dataDirectory = configuration["DataPaths:Orders"]
        ?? throw new InvalidOperationException("DataPaths:Orders required");

    public async Task<Order[]> GetAllAsync()
    {
        var files = Directory.GetFiles(_dataDirectory, "*.json");
        return await Task.WhenAll(files.Select(GetAsync));
    }

    public async Task<Order> GetByIdAsync(string id)
    {
        var filePath = Path.Combine(_dataDirectory, $"{id}.json");
        return await GetAsync(filePath);  // Throws FileNotFoundException if missing
    }
}
```

**Endpoints: Handle HTTP lifecycle + error logging**

Only log errors (500), not success (200) or not-found (404).

```csharp
private static async Task<IResult> GetById(
    string id,
    Repository repository,
    ILogger logger)
{
    try
    {
        var order = await repository.GetByIdAsync(id);
        return Results.Ok(order);  // No success logging
    }
    catch (FileNotFoundException)
    {
        return Results.NotFound(new { message = $"Order '{id}' not found" });  // No 404 logging
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error retrieving order {OrderId}", id);  // Only log errors
        return Results.Problem();
    }
}
```

**Fail Fast**
- Constructor validates configuration (fail at startup)
- Don't check `File.Exists()` - let I/O throw naturally
- Deserialization returns null → throw `InvalidOperationException`
- FileNotFoundException → 404, other exceptions → 500
