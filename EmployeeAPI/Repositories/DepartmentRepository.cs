using EmployeeAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EmployeeAPI.Repositories;

public class DepartmentRepository
{
    private readonly string _connectionString;

    public DepartmentRepository(
        IConfiguration configuration)
    {
        _connectionString =
            configuration.GetConnectionString(
                "DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string not found.");
    }

    public async Task<List<Department>>
        GetDepartmentsAsync()
    {
        var departments =
            new List<Department>();

        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_GetDepartments",
                connection);

        command.CommandType =
            CommandType.StoredProcedure;

        using var reader =
            await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            departments.Add(
                new Department
                {
                    DepartmentId =
                        reader.GetInt32(0),

                    DepartmentName =
                        reader.GetString(1),

                    IsActive =
                        reader.GetBoolean(2)
                });
        }

        return departments;
    }

    public async Task<int>
    AddDepartmentAsync(
        string departmentName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_AddDepartment",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentName",
            departmentName);

        return Convert.ToInt32(
            await command.ExecuteScalarAsync());
    }

    public async Task<bool>
    UpdateDepartmentAsync(
        int departmentId,
        string departmentName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_UpdateDepartment",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        command.Parameters.AddWithValue(
            "@DepartmentName",
            departmentName);

        var rowsAffected =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return rowsAffected > 0;
    }

    public async Task<bool>
    DeleteDepartmentAsync(
        int departmentId)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_DeleteDepartment",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        var rowsAffected =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return rowsAffected > 0;
    }
}