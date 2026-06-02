using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Employee>> GetEmployees()
    {
        var employees = new List<Employee>
        {
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
            },
            new Employee
            {
                Id = 3,
                Name = "Aman",
                Email = "aman@gmail.com",
                Department = "Finance"
            }
        };

        return Ok(employees);
    }
}