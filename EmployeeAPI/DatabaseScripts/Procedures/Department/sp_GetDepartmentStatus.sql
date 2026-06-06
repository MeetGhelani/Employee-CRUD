CREATE OR ALTER PROCEDURE sp_GetDepartmentStatus
(
    @DepartmentName NVARCHAR(100)
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT TOP 1

        CASE

            WHEN IsActive = 1 THEN 1

            WHEN IsActive = 0 THEN 2

        END AS StatusCode

    FROM DepartmentMaster

    WHERE
        UPPER(LTRIM(RTRIM(DepartmentName)))
        =
        UPPER(LTRIM(RTRIM(@DepartmentName)))

END