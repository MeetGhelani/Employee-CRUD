using EmployeeAPI.DTOs;
using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using EmployeeAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
   private readonly AppDbContext _context;

    public EmployeesController(AppDbContext context)
{
    _context = context;
}

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>>
    GetEmployees()
    {
        var employees = await _context
            .Employees
            .Select(e => new EmployeeDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Department = e.Department
            })
            .ToListAsync();

        return Ok(employees);
}

    [HttpPost]
public async Task<ActionResult<EmployeeDto>>
CreateEmployee(CreateEmployeeDto dto)
{
    var employee = new Employee
    {
        Name = dto.Name,
        Email = dto.Email,
        Department = dto.Department
    };

    _context.Employees.Add(employee);

    await _context.SaveChangesAsync();

    var result = new EmployeeDto
    {
        Id = employee.Id,
        Name = employee.Name,
        Email = employee.Email,
        Department = employee.Department
    };

    return CreatedAtAction(
        nameof(GetEmployees),
        result);
}
}