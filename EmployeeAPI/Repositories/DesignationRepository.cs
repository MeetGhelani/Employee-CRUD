using EmployeeAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EmployeeAPI.Repositories;

public class DesignationRepository
{
    private readonly string _connectionString;

    public DesignationRepository(
        IConfiguration configuration)
    {
        _connectionString =
            configuration.GetConnectionString(
                "DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string not found.");
    }

    public async Task<List<Designation>>
    GetDesignationsAsync()
    {
        var designations =
            new List<Designation>();

        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_GetDesignations",
                connection);

        command.CommandType =
            CommandType.StoredProcedure;

        using var reader =
            await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            designations.Add(
                new Designation
                {
                    DesignationId =
                        reader.GetInt32(0),

                    DesignationName =
                        reader.GetString(1),

                    DepartmentId =
                        reader.GetInt32(2),

                    IsActive =
                        reader.GetBoolean(3)
                });
        }

        return designations;
    }

    public async Task<List<Designation>>
    GetDesignationsByDepartmentAsync(
            int departmentId)
    {
        var designations =
            new List<Designation>();

        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_GetDesignationsByDepartment",
                connection);

        command.CommandType =
            CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        using var reader =
            await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            designations.Add(
                new Designation
                {
                    DesignationId =
                        reader.GetInt32(0),

                    DesignationName =
                        reader.GetString(1),

                    DepartmentId =
                        reader.GetInt32(2),

                    IsActive =
                        reader.GetBoolean(3)
                });
        }

        return designations;
    }

    public async Task<bool>
    IsDesignationInDepartmentAsync(
        int designationId,
        int departmentId)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        var command = new SqlCommand(
            @"
            SELECT COUNT(*)
            FROM DesignationMaster
            WHERE
                DesignationId = @DesignationId
                AND DepartmentId = @DepartmentId
                AND IsActive = 1",
            connection);

        command.Parameters.AddWithValue(
            "@DesignationId",
            designationId);

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        var count =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return count > 0;
    }

    public async Task<int>
    AddDesignationAsync(
        int departmentId,
        string designationName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_AddDesignation",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        command.Parameters.AddWithValue(
            "@DesignationName",
            designationName);

        return Convert.ToInt32(
            await command.ExecuteScalarAsync());
    }

    public async Task<bool>
    UpdateDesignationAsync(
        int designationId,
        int departmentId,
        string designationName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_UpdateDesignation",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DesignationId",
            designationId);

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        command.Parameters.AddWithValue(
            "@DesignationName",
            designationName);

        var rowsAffected =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return rowsAffected > 0;
    }

    public async Task<bool>
    DeleteDesignationAsync(
        int designationId)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_DeleteDesignation",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DesignationId",
            designationId);

        var rowsAffected =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return rowsAffected > 0;
    }

    public async Task<bool>
    DesignationExistsAsync(
        int departmentId,
        string designationName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_DesignationExists",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        command.Parameters.AddWithValue(
            "@DesignationName",
            designationName);

        var count =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return count > 0;
    }

    public async Task<bool>
    DesignationExistsForOtherDesignationAsync(
        int designationId,
        int departmentId,
        string designationName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_DesignationExistsForOtherDesignation",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DesignationId",
            designationId);

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        command.Parameters.AddWithValue(
            "@DesignationName",
            designationName);

        var count =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return count > 0;
    }

    public async Task<bool>
    DesignationHasEmployeesAsync(
        int designationId)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_DesignationHasEmployees",
                connection);

        command.CommandType =
            System.Data.CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DesignationId",
            designationId);

        var count =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return count > 0;
    }

    public async Task<int>
    GetDesignationStatusAsync(
        int departmentId,
        string designationName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_GetDesignationStatus",
                connection);

        command.CommandType =
            CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        command.Parameters.AddWithValue(
            "@DesignationName",
            designationName);

        var result =
            await command.ExecuteScalarAsync();

        if (result == null)
        {
            return 0;
        }

        return Convert.ToInt32(result);
    }

    public async Task<bool>
    ReactivateDesignationAsync(
        int departmentId,
        string designationName)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_ReactivateDesignation",
                connection);

        command.CommandType =
            CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        command.Parameters.AddWithValue(
            "@DesignationName",
            designationName);

        var rowsAffected =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return rowsAffected > 0;
    }

    public async Task<bool>
    IsDepartmentActiveAsync(
        int departmentId)
    {
        using var connection =
            new SqlConnection(
                _connectionString);

        await connection.OpenAsync();

        using var command =
            new SqlCommand(
                "sp_IsDepartmentActive",
                connection);

        command.CommandType =
            CommandType.StoredProcedure;

        command.Parameters.AddWithValue(
            "@DepartmentId",
            departmentId);

        var count =
            Convert.ToInt32(
                await command.ExecuteScalarAsync());

        return count > 0;
    }
}