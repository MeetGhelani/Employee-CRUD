namespace EmployeeAPI.DTOs;

public class EmployeeDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public int DepartmentId { get; set; }

    public int DesignationId { get; set; }

    public string DepartmentName { get; set; } = string.Empty;

    public string DesignationName { get; set; } = string.Empty;
}