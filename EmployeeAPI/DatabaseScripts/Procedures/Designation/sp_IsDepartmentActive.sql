CREATE OR ALTER PROCEDURE sp_IsDepartmentActive
(
    @DepartmentId INT
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT COUNT(*)
    FROM DepartmentMaster
    WHERE
        DepartmentId = @DepartmentId
        AND IsActive = 1;

END