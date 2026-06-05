using EmployeeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using EmployeeAPI.DTOs;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController
    : ControllerBase
{
    private readonly DepartmentService
        _service;

    public DepartmentsController(
        DepartmentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult>
        GetDepartments()
    {
        var departments =
            await _service
                .GetDepartmentsAsync();

        return Ok(departments);
    }

    [HttpPost]
    public async Task<IActionResult>
    CreateDepartment(
        CreateDepartmentDto dto)
    {
        var departmentId =
            await _service
                .AddDepartmentAsync(
                    dto.DepartmentName);

        return Ok(
            new
            {
                DepartmentId =
                    departmentId
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult>
    UpdateDepartment(
        int id,
        UpdateDepartmentDto dto)
    {
        var updated =
            await _service
                .UpdateDepartmentAsync(
                    id,
                    dto.DepartmentName);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult>
    DeleteDepartment(
        int id)
    {
        var deleted =
            await _service
                .DeleteDepartmentAsync(
                    id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}