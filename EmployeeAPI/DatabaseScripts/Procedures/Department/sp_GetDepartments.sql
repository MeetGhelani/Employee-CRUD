CREATE OR ALTER PROCEDURE sp_GetDepartments
AS
BEGIN

    SET NOCOUNT ON;

    SELECT
        DepartmentId,
        DepartmentName,
        IsActive
    FROM DepartmentMaster
    WHERE IsActive = 1
    ORDER BY DepartmentName;

END