CREATE OR ALTER PROCEDURE sp_DeleteDepartment
(
    @DepartmentId INT
)
AS
BEGIN

    SET NOCOUNT ON;

    UPDATE DepartmentMaster
    SET IsActive = 0
    WHERE DepartmentId = @DepartmentId;

    UPDATE DesignationMaster
    SET IsActive = 0
    WHERE DepartmentId = @DepartmentId;

    SELECT 1;

END