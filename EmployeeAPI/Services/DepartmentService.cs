using EmployeeAPI.Models;
using EmployeeAPI.Repositories;

namespace EmployeeAPI.Services;

public class DepartmentService
{
    private readonly DepartmentRepository
        _repository;

    public DepartmentService(
        DepartmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Department>>
        GetDepartmentsAsync()
    {
        return await
            _repository
                .GetDepartmentsAsync();
    }

    public async Task<int>
    AddDepartmentAsync(
        string departmentName)
    {
        return await _repository
            .AddDepartmentAsync(
                departmentName);
    }

    public async Task<bool>
    UpdateDepartmentAsync(
        int departmentId,
        string departmentName)
    {
        return await _repository
            .UpdateDepartmentAsync(
                departmentId,
                departmentName);
    }

    public async Task<bool>
    DeleteDepartmentAsync(
        int departmentId)
    {
        return await _repository
            .DeleteDepartmentAsync(
                departmentId);
    }
}