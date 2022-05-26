----------------------------------------------------------------
-- Schema for creating and using employeeDB
----------------------------------------------------------------

-- If employeeDB already exists, the following script drops it
DROP DATABASE IF EXISTS employeeDB;
-- This script creates employeeDB
CREATE DATABASE employeeDB;

USE employeeDB;


----------------------------------------------------------------
-- Schema for creating department table --
----------------------------------------------------------------
CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,      
    name VARCHAR(30) NOT NULL, --to hold department name
);
INTO department(name) VALUES ('Parasitology'),


----------------------------------------------------------------
-- Schema for creating rol table --
----------------------------------------------------------------
CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,    
    title VARCHAR(30) NOT NULL, --to hold role title
    salary DECIMAL NOT NULL, --to hold role salary
    department_id int, -- to hold reference to department role belongs to
    PRIMARY KEY (id),
    FOREIGN KEY(department_id) REFERENCES department(id)
)


----------------------------------------------------------------
-- Schema for creating employee table --
----------------------------------------------------------------

CREATE TABLE employee (
        id int NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL, -- to hold employee first name
        last_name VARCHAR(30) NOT NULL, -- to hold employee last name
        role_id int, -- to hold reference to employee role
        manager_id int NULL, -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
        PRIMARY KEY (id),
        FOREIGN KEY(role_id) REFERENCES role(id),
        FOREIGN KEY(manager_id) REFERENCES employee(id)
);
