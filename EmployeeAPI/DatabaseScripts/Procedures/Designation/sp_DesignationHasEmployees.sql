CREATE OR ALTER PROCEDURE sp_DesignationHasEmployees
(
    @DesignationId INT
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT COUNT(*)
    FROM Employees
    WHERE DesignationId = @DesignationId;

END