CREATE OR ALTER PROCEDURE sp_GetDesignationsByDepartment
(
    @DepartmentId INT
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT
        DesignationId,
        DesignationName,
        DepartmentId,
        IsActive
    FROM DesignationMaster
    WHERE
        DepartmentId = @DepartmentId
        AND IsActive = 1
    ORDER BY DesignationName;

END