CREATE OR ALTER PROCEDURE sp_AddDesignation
(
    @DepartmentId INT,
    @DesignationName NVARCHAR(100)
)
AS
BEGIN

    INSERT INTO DesignationMaster
    (
        DepartmentId,
        DesignationName,
        IsActive
    )
    VALUES
    (
        @DepartmentId,
        @DesignationName,
        1
    );

    SELECT SCOPE_IDENTITY();

END