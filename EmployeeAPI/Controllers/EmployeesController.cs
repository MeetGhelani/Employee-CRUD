using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private static readonly List<Employee> Employees =
    [
        new Employee
        {
            Id = 1,
            Name = "Rahul",
            Email = "rahul@gmail.com",
            Department = "IT"
        },
        new Employee
        {
            Id = 2,
            Name = "Priya",
            Email = "priya@gmail.com",
            Department = "HR"
        }
    ];

    [HttpGet]
    public ActionResult<IEnumerable<Employee>> GetEmployees()
    {
        return Ok(Employees);
    }

    [HttpPost]
    public ActionResult<Employee> CreateEmployee(
        Employee employee)
    {
        employee.Id =
            Employees.Max(e => e.Id) + 1;

        Employees.Add(employee);

        return CreatedAtAction(
            nameof(GetEmployees),
            employee);
    }
}