using EmployeeAPI.DTOs;
using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using EmployeeAPI.Repositories;
using EmployeeAPI.Services;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeService _service;
   public EmployeesController(
    EmployeeService service)
{
    _service = service;
}

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>>

    
    GetEmployees(
        [FromQuery] string? search,
        [FromQuery] string? sortBy,
        [FromQuery] string? sortOrder)    {

        var employees =
        await _service.GetEmployeesAsync(search, sortBy, sortOrder);
        var result =
            employees.Select(e => new EmployeeDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Department = e.Department
            });

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeDto>>
    CreateEmployee(CreateEmployeeDto dto)
    {

        var emailExists =
            await _service.EmailExistsAsync(
                dto.Email);

        if (emailExists)
        {
            return Conflict(new
            {
                message =
                    "Email already exists."
            });
        }
        var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,
            Department = dto.Department
        };

        var createdEmployee =
        await _service.CreateEmployeeAsync(employee);       

        var result = new EmployeeDto
        {
            Id = createdEmployee.Id,
            Name = createdEmployee.Name,
            Email = createdEmployee.Email,
            Department = createdEmployee.Department
        };

        return CreatedAtAction(
            nameof(GetEmployees),
            result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult>
    UpdateEmployee(
        int id,
        UpdateEmployeeDto dto)
    {
        var emailExists =
            await _service
                .EmailExistsForOtherEmployeeAsync(
                    id,
                    dto.Email);

        if (emailExists)
        {
            return Conflict(new
            {
                message =
                    "Email already exists."
            });
        }

        var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,
            Department = dto.Department
        };

        var updated =
            await _service.UpdateEmployeeAsync(
                id,
                employee);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult>
    DeleteEmployee(int id)
    {
        var deleted =
            await _service.DeleteEmployeeAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}