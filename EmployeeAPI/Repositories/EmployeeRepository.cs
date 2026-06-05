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

    public async Task<PagedEmployeeResult>
    GetEmployeesAsync(
        string? search,
        string? sortBy,
        string? sortOrder,
        int page,
        int pageSize)
    {
        var employees =
            new List<Employee>();

        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_GetEmployees",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@Search",
            string.IsNullOrWhiteSpace(search)
                ? DBNull.Value
                : search);

        command.Parameters.AddWithValue(
            "@SortBy",
            string.IsNullOrWhiteSpace(sortBy)
                ? DBNull.Value
                : sortBy);

        command.Parameters.AddWithValue(
            "@SortOrder",
            string.IsNullOrWhiteSpace(sortOrder)
                ? "asc"
                : sortOrder);

        command.Parameters.AddWithValue(
            "@Page",
            page);

        command.Parameters.AddWithValue(
            "@PageSize",
            pageSize);

        using var reader =
            await command.ExecuteReaderAsync();

        int totalCount = 0;

        if (await reader.ReadAsync())
        {
            totalCount =
                reader.GetInt32(0);
        }

        await reader.NextResultAsync();

        while (await reader.ReadAsync())
        {
            employees.Add(
                new Employee
                {
                    Id =
                        reader.GetInt32(0),

                    Name =
                        reader.GetString(1),

                    Email =
                        reader.GetString(2),

                    DepartmentId =
                        reader.GetInt32(3),

                    DesignationId =
                        reader.GetInt32(4),

                    DepartmentName =
                        reader.GetString(5),

                    DesignationName =
                        reader.GetString(6)
                });
        }

        return new PagedEmployeeResult
        {
            Employees = employees,
            TotalCount = totalCount
        };
    }

    public async Task<Employee>
    CreateEmployeeAsync(
        Employee employee)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_AddEmployee",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@Name",
            employee.Name);

        command.Parameters.AddWithValue(
            "@Email",
            employee.Email);

        command.Parameters.AddWithValue(
            "@DepartmentId",
            employee.DepartmentId);

        command.Parameters.AddWithValue(
            "@DesignationId",
            employee.DesignationId);

        var id =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        employee.Id = id;

        return employee;
    }

    public async Task<bool>
    UpdateEmployeeAsync(
        int id,
        Employee employee)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_UpdateEmployee",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@Id",
            id);

        command.Parameters.AddWithValue(
            "@Name",
            employee.Name);

        command.Parameters.AddWithValue(
            "@Email",
            employee.Email);

        command.Parameters.AddWithValue(
            "@DepartmentId",
            employee.DepartmentId);

        command.Parameters.AddWithValue(
            "@DesignationId",
            employee.DesignationId);

        var rowsAffected =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return rowsAffected > 0;
    }
    public async Task<bool>
    DeleteEmployeeAsync(
        int id)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_DeleteEmployee",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@Id",
            id);

        var rowsAffected =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return rowsAffected > 0;
    }

   public async Task<bool>
    EmailExistsAsync(string email)
    {
        using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        var command = new SqlCommand(
            @"
            SELECT COUNT(*)
            FROM Employees
            WHERE Email = @Email",
            connection);

        command.Parameters.AddWithValue(
            "@Email",
            email);

        var count =
            (int)await command.ExecuteScalarAsync();

        return count > 0;
    }

    public async Task<bool>
    EmailExistsForOtherEmployeeAsync(
        int id,
        string email)
    {
        using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        var command = new SqlCommand(
            @"
            SELECT COUNT(*)
            FROM Employees
            WHERE Email = @Email
            AND Id <> @Id",
            connection);

        command.Parameters.AddWithValue(
            "@Email",
            email);

        command.Parameters.AddWithValue(
            "@Id",
            id);

        var count =
            (int)await command.ExecuteScalarAsync();

        return count > 0;
    }
}