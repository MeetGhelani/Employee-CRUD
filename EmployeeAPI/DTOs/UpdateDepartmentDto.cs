using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.DTOs;

public class UpdateDepartmentDto
{
    [Required]
    [StringLength(100)]
    public string DepartmentName
    {
        get;
        set;
    } = string.Empty;
}