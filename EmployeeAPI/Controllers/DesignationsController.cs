using EmployeeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using EmployeeAPI.DTOs;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DesignationsController
    : ControllerBase
{
    private readonly DesignationService
        _service;

    public DesignationsController(
        DesignationService service)
    {
        _service = service;
    }
    

    [HttpGet]
    public async Task<IActionResult>
        GetDesignations()
    {
        return Ok(
            await _service
                .GetDesignationsAsync());
    }

    [HttpGet("department/{departmentId}")]
    public async Task<IActionResult>
        GetByDepartment(
            int departmentId)
    {
        return Ok(
            await _service
                .GetDesignationsByDepartmentAsync(
                    departmentId));
    }

    [HttpPost]
    public async Task<IActionResult>
    CreateDesignation(
        CreateDesignationDto dto)
    {

      dto.DesignationName =
      dto.DesignationName.Trim();  

      var status =
            await _service
                .GetDesignationStatusAsync(
                    dto.DepartmentId,
                    dto.DesignationName);

        if (status == 1)
        {
            return Conflict(
                new
                {
                    message =
                        "Designation already exists in this department."
                });
        }

        if (status == 2)
        {
            await _service
                .ReactivateDesignationAsync(
                    dto.DepartmentId,
                    dto.DesignationName);

            return Ok(
                new
                {
                    message =
                        "Designation reactivated successfully."
                });
        }

        var designationId =
            await _service
                .AddDesignationAsync(
                    dto.DepartmentId,
                    dto.DesignationName);

        return Ok(
            new
            {
                DesignationId =
                    designationId
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult>
    UpdateDesignation(
        int id,
        UpdateDesignationDto dto)
    {

        dto.DesignationName =
        dto.DesignationName.Trim();

        var status =
            await _service
                .GetDesignationStatusAsync(
                    dto.DepartmentId,
                    dto.DesignationName);

        if (status == 1)
        {
            return Conflict(
                new
                {
                    message =
                        "Designation already exists in this department."
                });
        }

        if (status == 2)
        {
            await _service
                .ReactivateDesignationAsync(
                    dto.DepartmentId,
                    dto.DesignationName);

            return Ok(
                new
                {
                    message =
                        "Designation reactivated successfully."
                });
        }

        var updated =
            await _service
                .UpdateDesignationAsync(
                    id,
                    dto.DepartmentId,
                    dto.DesignationName);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult>
    DeleteDesignation(int id)
    {
        var hasEmployees =
            await _service
                .DesignationHasEmployeesAsync(id);

        if (hasEmployees)
        {
            return Conflict(
                new
                {
                    message =
                        "Designation cannot be deleted because employees are assigned to it."
                });
        }

        var deleted =
            await _service
                .DeleteDesignationAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }


}