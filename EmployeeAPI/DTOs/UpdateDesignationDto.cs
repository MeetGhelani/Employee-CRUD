using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.DTOs;

public class UpdateDesignationDto
{
    [Required]
    public int DepartmentId { get; set; }
    private string _designationName = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 2)]
    [RegularExpression(
    @"^(?=.*[A-Za-z])[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$",
    ErrorMessage =
    "Must contain at least one letter and can contain only letters, numbers and spaces.")]
    public string DesignationName
    {
        get => _designationName ;

        set => _designationName = value?.Trim() ?? string.Empty;
    }
}