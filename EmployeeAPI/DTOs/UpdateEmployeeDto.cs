using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.DTOs;

public class UpdateEmployeeDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    [RegularExpression(
        @"^[A-Za-z]+(?:\s[A-Za-z]+)*$",
        ErrorMessage =
        "Name can contain only letters and spaces.")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [RegularExpression(
        @"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$",
        ErrorMessage = "Invalid email format.")]
    [StringLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Range(1, int.MaxValue)]
    public int DepartmentId { get; set; }

    [Required]
    [Range(1, int.MaxValue)]
    public int DesignationId { get; set; }
}