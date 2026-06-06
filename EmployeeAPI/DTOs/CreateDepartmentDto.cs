using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.DTOs;

public class CreateDepartmentDto
{
   private string _departmentName = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 2)]
    [RegularExpression(
        @"^(?=.*[A-Za-z])[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$",
        ErrorMessage =
        "Must contain at least one letter and can contain only letters, numbers and spaces.")]
    public string DepartmentName
    {
        get => _departmentName;

        set => _departmentName = value?.Trim() ?? string.Empty;
    }
    }