CREATE OR ALTER PROCEDURE sp_UpdateEmployee
(
    @Id INT,
    @Name NVARCHAR(100),
    @Email NVARCHAR(150),
    @DepartmentId INT,
    @DesignationId INT
)
AS
BEGIN

    SET NOCOUNT ON;

    UPDATE Employees
    SET
        Name = @Name,
        Email = @Email,
        DepartmentId = @DepartmentId,
        DesignationId = @DesignationId
    WHERE Id = @Id;

    SELECT @@ROWCOUNT AS RowsAffected;

END