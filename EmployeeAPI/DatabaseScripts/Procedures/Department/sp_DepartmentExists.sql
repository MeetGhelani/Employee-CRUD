CREATE OR ALTER PROCEDURE sp_DepartmentExists
(
    @DepartmentName NVARCHAR(100)
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT COUNT(*)
    FROM DepartmentMaster
    WHERE
        UPPER(LTRIM(RTRIM(DepartmentName)))
        =
        UPPER(LTRIM(RTRIM(@DepartmentName)))
        AND IsActive = 1;

END