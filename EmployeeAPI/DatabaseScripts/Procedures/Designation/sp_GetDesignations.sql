CREATE OR ALTER PROCEDURE sp_GetDesignations
AS
BEGIN

    SET NOCOUNT ON;

    SELECT
        DesignationId,
        DesignationName,
        DepartmentId,
        IsActive
    FROM DesignationMaster
    WHERE IsActive = 1
    ORDER BY DesignationName;

END