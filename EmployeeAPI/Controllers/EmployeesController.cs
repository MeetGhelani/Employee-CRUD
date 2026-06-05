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

    private readonly DesignationService
    _designationService;
    private readonly EmployeeService _service;
    public EmployeesController(
        EmployeeService service,
        DesignationService designationService)
    {
        _service = service;

        _designationService =
            designationService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedEmployeeResponseDto>>
    
    GetEmployees(
        [FromQuery] string? search,
        [FromQuery] string? sortBy,
        [FromQuery] string? sortOrder,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
        )    {

        var pagedResult =
            await _service.GetEmployeesAsync(search, sortBy, sortOrder, page, pageSize);
        var employeeDtos =
            pagedResult.Employees.Select(e => new EmployeeDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,

                DepartmentId = e.DepartmentId,
                DesignationId = e.DesignationId,

                DepartmentName =
                    e.DepartmentName ?? string.Empty,

                DesignationName =
                    e.DesignationName ?? string.Empty
            });

        return Ok(
            new PagedEmployeeResponseDto
            {
                Employees = employeeDtos,
                TotalCount =
                pagedResult.TotalCount,
                Page = page,
                PageSize = pageSize
        });
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

        var validCombination =
            await _designationService
                .IsDesignationInDepartmentAsync(
                    dto.DesignationId,
                    dto.DepartmentId);

        if (!validCombination)
        {
            return BadRequest(
                new
                {
                    message =
                        "Designation does not belong to selected department."
                });
        }

       var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,

            DepartmentId =
                dto.DepartmentId,

            DesignationId =
                dto.DesignationId
        };

        var createdEmployee =
        await _service.CreateEmployeeAsync(employee);       

       var result = new EmployeeDto
        {
            Id = createdEmployee.Id,
            Name = createdEmployee.Name,
            Email = createdEmployee.Email,

            DepartmentId =
                createdEmployee.DepartmentId,

            DesignationId =
                createdEmployee.DesignationId,

            DepartmentName =
                createdEmployee.DepartmentName
                ?? string.Empty,

            DesignationName =
                createdEmployee.DesignationName
                ?? string.Empty
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

        var validCombination =
            await _designationService
                .IsDesignationInDepartmentAsync(
                    dto.DesignationId,
                    dto.DepartmentId);

        if (!validCombination)
        {
            return BadRequest(
                new
                {
                    message =
                        "Designation does not belong to selected department."
                });
        }

       var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,

            DepartmentId =
                dto.DepartmentId,

            DesignationId =
                dto.DesignationId
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