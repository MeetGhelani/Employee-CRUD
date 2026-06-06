CREATE OR ALTER PROCEDURE sp_GetDesignationStatus
(
    @DepartmentId INT,
    @DesignationName NVARCHAR(100)
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT TOP 1

        CASE

            WHEN IsActive = 1 THEN 1

            WHEN IsActive = 0 THEN 2

        END AS StatusCode

    FROM DesignationMaster

    WHERE
    DepartmentId = @DepartmentId
    AND UPPER(LTRIM(RTRIM(DesignationName)))
        =
        UPPER(LTRIM(RTRIM(@DesignationName)));

END