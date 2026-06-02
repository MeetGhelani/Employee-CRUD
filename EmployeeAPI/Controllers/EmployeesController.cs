using EmployeeAPI.DTOs;
using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using EmployeeAPI.Repositories;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeRepository _repository;

    public EmployeesController(
        EmployeeRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>>
    GetEmployees()
    {
        var employees =
            await _repository.GetEmployeesAsync();

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
        var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,
            Department = dto.Department
        };

        var createdEmployee =
            await _repository.CreateEmployeeAsync(
                employee);

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
}