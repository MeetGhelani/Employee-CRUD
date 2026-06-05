CREATE OR ALTER PROCEDURE sp_DeleteDepartment
(
    @DepartmentId INT
)
AS
BEGIN

    UPDATE DepartmentMaster
    SET
        IsActive = 0
    WHERE
        DepartmentId =
            @DepartmentId;

    SELECT @@ROWCOUNT;

END