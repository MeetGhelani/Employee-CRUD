CREATE OR ALTER PROCEDURE sp_ReactivateDesignation
(
    @DepartmentId INT,
    @DesignationName NVARCHAR(100)
)
AS
BEGIN

    UPDATE DesignationMaster
    SET IsActive = 1
    WHERE
        DepartmentId = @DepartmentId
        AND UPPER(LTRIM(RTRIM(DesignationName)))
            =
            UPPER(LTRIM(RTRIM(@DesignationName)))
        AND IsActive = 0;

    SELECT @@ROWCOUNT;

END