-- --------------------------------------------------------------------------
-- The following script is used to insert data into department table
-- --------------------------------------------------------------------------
INSERT INTO department(name) VALUES ('Management');
INSERT INTO department(name) VALUES ('Accounting');
INSERT INTO department(name) VALUES ('Human Resources');
INSERT INTO department(name) VALUES ('Veterinary');
INSERT INTO department(name) VALUES ('Pathology');
INSERT INTO department(name) VALUES ('Parasitology');

-- --------------------------------------------------------------------------
-- The following script is used to insert data into role table
-- --------------------------------------------------------------------------
-- Management Departments Roles
INSERT INTO role ( title, salary, department_id) VALUES ('CEO', 15000, 1);
INSERT INTO role ( title, salary, department_id) VALUES ('Admin and Finance Head', 8000, 1);

-- Accounting Department Roles
INSERT INTO role ( title, salary, department_id) VALUES ('Finance Head', 7500, 2);
INSERT INTO role ( title, salary, department_id) VALUES ('Chief Accountant', 7000, 2);
INSERT INTO role ( title, salary, department_id) VALUES ('Senior Accountant', 6500, 2);
INSERT INTO role ( title, salary, department_id) VALUES ('Payroll Accountant', 5000, 2);
INSERT INTO role ( title, salary, department_id) VALUES ('Junior Accountant', 4500, 2);


-- Human Resources Departments Roles
INSERT INTO role ( title, salary, department_id) VALUES ('Human Resources Manager', 7000, 3);

-- Veterinary Department Roles
INSERT INTO role ( title, salary, department_id) VALUES ('Veterinary Department Head', 8000, 4);
INSERT INTO role ( title, salary, department_id) VALUES ('Senior Veterinarian', 7500, 4);
INSERT INTO role ( title, salary, department_id) VALUES ('Junior Veterinarian', 6000, 4);

-- Pathology Department Roles
INSERT INTO role ( title, salary, department_id) VALUES ('Pathology Department Head', 6000, 5);
INSERT INTO role ( title, salary, department_id) VALUES ('Senior pathologist ', 5800, 5);
INSERT INTO role ( title, salary, department_id) VALUES ('Junior pathologist ', 6000, 5);


-- Parasitology Department Roles
INSERT INTO role ( title, salary, department_id) VALUES ('Parasitology Department Head', 6000, 6);
INSERT INTO role ( title, salary, department_id) VALUES ('Senior Parasitologists', 5800, 6);
INSERT INTO role ( title, salary, department_id) VALUES ('Junior Parasitologists', 6000, 6);

-- --------------------------------------------------------------------------
-- The following script is used to insert data into employee table
-- --------------------------------------------------------------------------

-- Employee Under CEO
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Abyou", "Geletu", 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Samrawit", "Balcha", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Hawi", "Abyou", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Emanda", "Abyou", 8, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Kat", "Miller", 9, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Connor", "Lakour", 12, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Connor", "Lakour", 15, 1);

-- Employee Under Finance Head
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Devid", "Aron", 2, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jeffrey", "Olson", 2, 3);

-- Employee Under Veterinary Department Head
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ahmad", "Awais", 10, 9);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jason", "Fontana", 11, 9);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Khadija", "Nemri", 11, 9);

-- Employee Under Parasitology Department Head
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ahmad", "Awais", 10, 12);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jason", "Fontana", 11, 12);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Khadija", "Nemri", 11, 12);

-- Employee Under Parasitology Department Head
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ahmad", "Awais", 10, 12);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jason", "Fontana", 11, 12);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Khadija", "Nemri", 11, 12);

-- Parasitology Department Head
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jennifer", "Alexandria", 16, 15);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Payal", "Shah", 17, 15);
