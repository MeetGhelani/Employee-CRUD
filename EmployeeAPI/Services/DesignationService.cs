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
}