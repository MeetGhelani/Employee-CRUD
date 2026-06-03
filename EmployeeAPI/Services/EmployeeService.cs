using EmployeeAPI.Models;
using EmployeeAPI.Repositories;

namespace EmployeeAPI.Services;

public class EmployeeService
{
    private readonly EmployeeRepository _repository;

    public EmployeeService(
        EmployeeRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Employee>>
    GetEmployeesAsync(
        string? search,
        string? sortBy,
        string? sortOrder)
    {
        return await _repository
            .GetEmployeesAsync(
                search,
                sortBy,
                sortOrder);
    }

    public async Task<Employee>
    CreateEmployeeAsync(Employee employee)
    {
        return await _repository
            .CreateEmployeeAsync(employee);
    }

    public async Task<bool>
    UpdateEmployeeAsync(
        int id,
        Employee employee)
    {
        return await _repository
            .UpdateEmployeeAsync(
                id,
                employee);
    }

    public async Task<bool>
    DeleteEmployeeAsync(int id)
    {
        return await _repository
            .DeleteEmployeeAsync(id);
    }

    public async Task<bool>
    EmailExistsAsync(string email)
    {
        return await _repository
            .EmailExistsAsync(email);
    }

    public async Task<bool>
    EmailExistsForOtherEmployeeAsync(
        int id,
        string email)
    {
        return await _repository
            .EmailExistsForOtherEmployeeAsync(
                id,
                email);
    }
}