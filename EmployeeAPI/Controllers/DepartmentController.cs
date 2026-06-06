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

        dto.DepartmentName =
        dto.DepartmentName.Trim();

      var status =
            await _service
                .GetDepartmentStatusAsync(
                    dto.DepartmentName);

        if (status == 1)
        {
            return Conflict(
                new
                {
                    message =
                        "Department already exists."
                });
        }

        if (status == 2)
        {
            await _service
                .ReactivateDepartmentAsync(
                    dto.DepartmentName);

            return Ok(
                new
                {
                    message =
                        "Department reactivated successfully."
                });
        }


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

        dto.DepartmentName =
        dto.DepartmentName.Trim();
        
        var status =
            await _service
                .GetDepartmentStatusAsync(
                    dto.DepartmentName);

        if (status == 1)
        {
            return Conflict(
                new
                {
                    message =
                        "Department already exists."
                });
        }

        if (status == 2)
        {
            await _service
                .ReactivateDepartmentAsync(
                    dto.DepartmentName);

            return Ok(
                new
                {
                    message =
                        "Department reactivated successfully."
                });
        }

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
    DeleteDepartment(int id)
    {
        var hasEmployees =
            await _service
                .DepartmentHasEmployeesAsync(id);

        if (hasEmployees)
        {
            return Conflict(new
            {
                message =
                    "Department cannot be deleted because employees are assigned to it."
            });
        }

        var deleted =
            await _service
                .DeleteDepartmentAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }


}