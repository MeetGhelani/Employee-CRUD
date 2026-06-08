using EmployeeAPI.Models;
using EmployeeAPI.Repositories;

namespace EmployeeAPI.Services;

public class DesignationService
{
    private readonly DesignationRepository
        _repository;

    public DesignationService(
        DesignationRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Designation>>
    GetDesignationsAsync()
    {
        return await
            _repository
                .GetDesignationsAsync();
    }

    public async Task<List<Designation>>
    GetDesignationsByDepartmentAsync(
            int departmentId)
    {
        return await
            _repository
                .GetDesignationsByDepartmentAsync(
                    departmentId);
    }

    public async Task<bool>
    IsDesignationInDepartmentAsync(
        int designationId,
        int departmentId)
    {
        return await _repository
            .IsDesignationInDepartmentAsync(
                designationId,
                departmentId);
    }
    
    public async Task<int>
    AddDesignationAsync(
        int departmentId,
        string designationName)
    {
        return await _repository
            .AddDesignationAsync(
                departmentId,
                designationName);
    }

    public async Task<bool>
    UpdateDesignationAsync(
        int designationId,
        int departmentId,
        string designationName)
    {
        return await _repository
            .UpdateDesignationAsync(
                designationId,
                departmentId,
                designationName);
    }

    public async Task<bool>
    DeleteDesignationAsync(
        int designationId)
    {
        return await _repository
            .DeleteDesignationAsync(
                designationId);
    }

    public async Task<bool>
    DesignationExistsAsync(
        int departmentId,
        string designationName)
    {
        return await _repository
            .DesignationExistsAsync(
                departmentId,
                designationName);
    }

    public async Task<bool>
    DesignationExistsForOtherDesignationAsync(
        int designationId,
        int departmentId,
        string designationName)
    {
        return await _repository
            .DesignationExistsForOtherDesignationAsync(
                designationId,
                departmentId,
                designationName);
    }

    public async Task<bool>
    DesignationHasEmployeesAsync(
        int designationId)
    {
        return await _repository
            .DesignationHasEmployeesAsync(
                designationId);
    }

    public async Task<int>
    GetDesignationStatusAsync(
        int departmentId,
        string designationName)
    {
        return await _repository
            .GetDesignationStatusAsync(
                departmentId,
                designationName);
    }

    public async Task<bool>
    ReactivateDesignationAsync(
        int departmentId,
        string designationName)
    {
        return await _repository
            .ReactivateDesignationAsync(
                departmentId,
                designationName);
    }

    public async Task<bool>
    IsDepartmentActiveAsync(
        int departmentId)
    {
        return await _repository
            .IsDepartmentActiveAsync(
                departmentId);
    }
}