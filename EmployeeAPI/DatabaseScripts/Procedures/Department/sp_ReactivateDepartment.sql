CREATE OR ALTER PROCEDURE sp_ReactivateDepartment
(
    @DepartmentName NVARCHAR(100)
)
AS
BEGIN

    UPDATE DepartmentMaster
    SET IsActive = 1
    WHERE
       UPPER(LTRIM(RTRIM(DepartmentName)))
        =
        UPPER(LTRIM(RTRIM(@DepartmentName)))
        AND IsActive = 0;

    SELECT @@ROWCOUNT;

END