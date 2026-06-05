CREATE OR ALTER PROCEDURE sp_UpdateDepartment
(
    @DepartmentId INT,
    @DepartmentName NVARCHAR(100)
)
AS
BEGIN

    UPDATE DepartmentMaster
    SET
        DepartmentName =
            @DepartmentName
    WHERE
        DepartmentId =
            @DepartmentId;

    SELECT @@ROWCOUNT;

END