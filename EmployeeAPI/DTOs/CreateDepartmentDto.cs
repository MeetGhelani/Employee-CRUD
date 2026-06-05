using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.DTOs;

public class CreateDepartmentDto
{
    [Required]
    [StringLength(100)]
    public string DepartmentName
    {
        get;
        set;
    } = string.Empty;
}