CREATE OR ALTER PROCEDURE sp_DepartmentHasEmployees
(
    @DepartmentId INT
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT
        COUNT(*)
    FROM Employees
    WHERE DepartmentId = @DepartmentId;

END

