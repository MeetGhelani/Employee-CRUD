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

    public async Task<List<Employee>> GetEmployeesAsync( string? search, string? sortBy, string? sortOrder)
    {
        var employees = new List<Employee>();

        var orderByClause =
            sortBy?.ToLower() switch
            {
                "name" => "Name",
                "email" => "Email",
                "department" => "Department",
                _ => "Id"
            };

        var direction =
            sortOrder?.ToLower() == "desc"
                ? "DESC"
                : "ASC";

        using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        var query = $@"
        SELECT
            Id,
            Name,
            Email,
            Department
        FROM Employees
        WHERE
            @Search IS NULL
            OR Name LIKE '%' + @Search + '%'
            OR Email LIKE '%' + @Search + '%'
            OR Department LIKE '%' + @Search + '%'
        ORDER BY
            {orderByClause}
            {direction}";

        var command =
            new SqlCommand(
                query,
                connection);

        command.Parameters.AddWithValue(
        "@Search",
        string.IsNullOrWhiteSpace(search)
            ? DBNull.Value
            : search);

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

public async Task<bool> UpdateEmployeeAsync(
    int id,
    Employee employee)
{
    using var connection =
        new SqlConnection(_connectionString);

    await connection.OpenAsync();

    var command = new SqlCommand(
        @"
        UPDATE Employees
        SET
            Name = @Name,
            Email = @Email,
            Department = @Department
        WHERE Id = @Id",
        connection);

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
        "@Department",
        employee.Department);

    var rowsAffected =
        await command.ExecuteNonQueryAsync();

    return rowsAffected > 0;
}

public async Task<bool> DeleteEmployeeAsync(
        int id)
{
        using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        var command = new SqlCommand(
            @"
            DELETE FROM Employees
            WHERE Id = @Id",
            connection);

        command.Parameters.AddWithValue(
            "@Id",
            id);

        var rowsAffected =
            await command.ExecuteNonQueryAsync();

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