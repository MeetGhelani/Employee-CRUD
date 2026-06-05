CREATE OR ALTER PROCEDURE sp_AddEmployee
(
    @Name NVARCHAR(100),
    @Email NVARCHAR(150),
    @DepartmentId INT,
    @DesignationId INT
)
AS
BEGIN

    SET NOCOUNT ON;

    INSERT INTO Employees
    (
        Name,
        Email,
        DepartmentId,
        DesignationId
    )
    VALUES
    (
        @Name,
        @Email,
        @DepartmentId,
        @DesignationId
    );

    SELECT SCOPE_IDENTITY() AS Id;

END