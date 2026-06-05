CREATE OR ALTER PROCEDURE sp_DeleteEmployee
(
    @Id INT
)
AS
BEGIN

    SET NOCOUNT ON;

    DELETE FROM Employees
    WHERE Id = @Id;

    SELECT @@ROWCOUNT AS RowsAffected;

END