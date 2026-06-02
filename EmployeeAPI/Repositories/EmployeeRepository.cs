using EmployeeAPI.Models;
using Microsoft.Data.SqlClient;

namespace EmployeeAPI.Repositories;

public class EmployeeRepository
{
    private readonly string _connectionString;

    public EmployeeRepository(IConfiguration configuration)
    {
        _connectionString =
            configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string not found.");
    }

    public async Task<List<Employee>> GetEmployeesAsync()
    {
        var employees = new List<Employee>();

        using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        var command = new SqlCommand(
            @"SELECT
                Id,
                Name,
                Email,
                Department
              FROM Employees",
            connection);

        using var reader =
            await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            employees.Add(new Employee
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Email = reader.GetString(2),
                Department = reader.GetString(3)
            });
        }

        return employees;
    }

    public async Task<Employee> CreateEmployeeAsync(
        Employee employee)
    {
        using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        var command = new SqlCommand(
            @"
            INSERT INTO Employees
            (
                Name,
                Email,
                Department
            )
            OUTPUT INSERTED.Id
            VALUES
            (
                @Name,
                @Email,
                @Department
            )",
            connection);

        command.Parameters.AddWithValue(
            "@Name",
            employee.Name);

        command.Parameters.AddWithValue(
            "@Email",
            employee.Email);

        command.Parameters.AddWithValue(
            "@Department",
            employee.Department);

        var id =
            (int)await command.ExecuteScalarAsync();

        employee.Id = id;

        return employee;
}
}