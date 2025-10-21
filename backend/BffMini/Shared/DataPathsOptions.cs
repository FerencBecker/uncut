using System.ComponentModel.DataAnnotations;

namespace BffMini.Shared;

public class DataPathsOptions
{
    [Required(ErrorMessage = "DataPaths:Studios configuration is required")]
    public string Studios { get; set; } = string.Empty;

    [Required(ErrorMessage = "DataPaths:Images configuration is required")]
    public string Images { get; set; } = string.Empty;

    [Required(ErrorMessage = "DataPaths:Manifests configuration is required")]
    public string Manifests { get; set; } = string.Empty;
}
