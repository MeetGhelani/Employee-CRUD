CREATE OR ALTER PROCEDURE sp_GetEmployees
(
    @Search NVARCHAR(200) = NULL,
    @SortBy NVARCHAR(50) = NULL,
    @SortOrder NVARCHAR(10) = 'ASC',
    @Page INT = 1,
    @PageSize INT = 10
)
AS
BEGIN

    SET NOCOUNT ON;

    DECLARE @Offset INT;

    SET @Offset =
        (@Page - 1) * @PageSize;

    ----------------------------------
    -- Total Count
    ----------------------------------

    SELECT
        COUNT(*)
    FROM Employees E
    INNER JOIN DepartmentMaster D
        ON E.DepartmentId =
           D.DepartmentId
    INNER JOIN DesignationMaster DG
        ON E.DesignationId =
           DG.DesignationId
    WHERE

        @Search IS NULL

        OR E.Name LIKE '%' + @Search + '%'

        OR E.Email LIKE '%' + @Search + '%'

        OR D.DepartmentName LIKE '%' + @Search + '%'

        OR DG.DesignationName LIKE '%' + @Search + '%';

    ----------------------------------
    -- Employee Data
    ----------------------------------

    SELECT

        E.Id,

        E.Name,

        E.Email,

        E.DepartmentId,

        E.DesignationId,

        D.DepartmentName,

        DG.DesignationName

    FROM Employees E

    INNER JOIN DepartmentMaster D
        ON E.DepartmentId =
           D.DepartmentId

    INNER JOIN DesignationMaster DG
        ON E.DesignationId =
           DG.DesignationId

    WHERE

        @Search IS NULL

        OR E.Name LIKE '%' + @Search + '%'

        OR E.Email LIKE '%' + @Search + '%'

        OR D.DepartmentName LIKE '%' + @Search + '%'

        OR DG.DesignationName LIKE '%' + @Search + '%'

    ORDER BY

        CASE
            WHEN @SortBy = 'name'
            AND @SortOrder = 'asc'
            THEN E.Name
        END ASC,

        CASE
            WHEN @SortBy = 'name'
            AND @SortOrder = 'desc'
            THEN E.Name
        END DESC,

        CASE
            WHEN @SortBy = 'email'
            AND @SortOrder = 'asc'
            THEN E.Email
        END ASC,

        CASE
            WHEN @SortBy = 'email'
            AND @SortOrder = 'desc'
            THEN E.Email
        END DESC,

        CASE
            WHEN @SortBy = 'departmentName'
            AND @SortOrder = 'asc'
            THEN D.DepartmentName
        END ASC,

        CASE
            WHEN @SortBy = 'departmentName'
            AND @SortOrder = 'desc'
            THEN D.DepartmentName
        END DESC,

        CASE
            WHEN @SortBy = 'designationName'
            AND @SortOrder = 'asc'
            THEN DG.DesignationName
        END ASC,

        CASE
            WHEN @SortBy = 'designationName'
            AND @SortOrder = 'desc'
            THEN DG.DesignationName
        END DESC,

        E.Id ASC

    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;

END