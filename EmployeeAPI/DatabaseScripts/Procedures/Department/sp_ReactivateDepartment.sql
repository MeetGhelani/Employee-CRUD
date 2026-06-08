CREATE OR ALTER PROCEDURE sp_ReactivateDepartment
(
    @DepartmentName NVARCHAR(100)
)
AS
BEGIN

    SET NOCOUNT ON;

    DECLARE @DepartmentId INT;

    SELECT
        @DepartmentId = DepartmentId
    FROM DepartmentMaster
    WHERE
        UPPER(LTRIM(RTRIM(DepartmentName)))
        =
        UPPER(LTRIM(RTRIM(@DepartmentName)))
        AND IsActive = 0;

    IF @DepartmentId IS NULL
    BEGIN
        SELECT 0;
        RETURN;
    END

    UPDATE DepartmentMaster
    SET IsActive = 1
    WHERE DepartmentId = @DepartmentId;

    UPDATE DesignationMaster
    SET IsActive = 1
    WHERE DepartmentId = @DepartmentId;

    SELECT 1;

END