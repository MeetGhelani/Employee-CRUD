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
    GetEmployeesAsync()
    {
        return await _repository.GetEmployeesAsync();
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
}