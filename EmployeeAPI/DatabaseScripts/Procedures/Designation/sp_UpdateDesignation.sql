CREATE OR ALTER PROCEDURE sp_UpdateDesignation
(
    @DesignationId INT,
    @DepartmentId INT,
    @DesignationName NVARCHAR(100)
)
AS
BEGIN

    UPDATE DesignationMaster
    SET
        DepartmentId = @DepartmentId,
        DesignationName = @DesignationName
    WHERE
        DesignationId = @DesignationId;

    SELECT @@ROWCOUNT;

END