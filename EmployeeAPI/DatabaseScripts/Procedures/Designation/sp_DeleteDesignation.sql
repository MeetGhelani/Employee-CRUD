CREATE OR ALTER PROCEDURE sp_DeleteDesignation
(
    @DesignationId INT
)
AS
BEGIN

    UPDATE DesignationMaster
    SET
        IsActive = 0
    WHERE
        DesignationId = @DesignationId;

    SELECT @@ROWCOUNT;

END