CREATE OR ALTER PROCEDURE sp_AddDepartment
(
    @DepartmentName NVARCHAR(100)
)
AS
BEGIN

    SET NOCOUNT ON;

    INSERT INTO DepartmentMaster
    (
        DepartmentName,
        IsActive
    )
    VALUES
    (
        @DepartmentName,
        1
    );

    SELECT
        SCOPE_IDENTITY();

END