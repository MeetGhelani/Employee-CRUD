CREATE OR ALTER PROCEDURE sp_DesignationExistsForOtherDesignation
(
    @DesignationId INT,
    @DepartmentId INT,
    @DesignationName NVARCHAR(100)
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT COUNT(*)
    FROM DesignationMaster
    WHERE
        DepartmentId = @DepartmentId
        AND UPPER(LTRIM(RTRIM(DesignationName)))
            =
            UPPER(LTRIM(RTRIM(@DesignationName)))
        AND DesignationId <> @DesignationId
        AND IsActive = 1;

END