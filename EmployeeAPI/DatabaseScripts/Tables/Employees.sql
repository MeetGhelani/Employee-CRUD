-- Remove old Department column

ALTER TABLE Employees
DROP COLUMN Department;

-- Add DepartmentId

ALTER TABLE Employees
ADD DepartmentId INT NOT NULL;

-- Add DesignationId

ALTER TABLE Employees
ADD DesignationId INT NOT NULL;

-- Foreign Key

ALTER TABLE Employees
ADD CONSTRAINT FK_Employee_Department
FOREIGN KEY (DepartmentId)
REFERENCES DepartmentMaster
(
    DepartmentId
);

-- Foreign Key

ALTER TABLE Employees
ADD CONSTRAINT FK_Employee_Designation
FOREIGN KEY (DesignationId)
REFERENCES DesignationMaster
(
    DesignationId
);