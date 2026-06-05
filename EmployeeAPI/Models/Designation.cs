namespace EmployeeAPI.Models;

public class Designation
{
    public int DesignationId { get; set; }

    public string DesignationName { get; set; } = string.Empty;

    public int DepartmentId { get; set; }

    public bool IsActive { get; set; }
}