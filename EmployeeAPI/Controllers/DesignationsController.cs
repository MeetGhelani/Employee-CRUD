using EmployeeAPI.Services;
using Microsoft.AspNetCore.Mvc;

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
}