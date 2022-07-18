// Importing the required packages that we installed into the node_module
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { lookup } = require("dns");
const Connection = require("mysql/lib/Connection");
require("console.table");

// Setting up a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",

  // Using your own port number is an option if you do not want to use the default one

  // Default port number
  port: 3306,

  // Your username
  user: "root",

  //Enter your own password
  password: "MYSQL@pass123",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id number: " + connection.threadId);
  console.log(
    `    _________________________________________________________________________________________________________
                               ╔══════════════════════════════════════════════════╗                        
                               ║   ABYOU'S          V  E  T        C L I N I C    ║                        
                               ╚══════════════════════════════════════════════════╝                        
        ╔═══════╗  ╔══╗     ╔═╗   ╔══════╗  ╔         ╔══════╗   ═══   ═══   ╔══════╗   ╔══════╗   ╔══════╗
        ║          ║   V   V  ║   ║      ║  ║         ║      ║     V   V     ║          ║          ║       
        ║          ║    V V   ║   ║══════╝  ║         ║      ║      V V      ║          ║          ║       
        ║══════╣   ║     V    ║   ║         ║         ║      ║       V       ║══════╣   ║══════╣   ╚══════╗
        ║          ║          ║   ║         ║         ║      ║       ║       ║          ║                 ║  
        ║          ║          ║   ║         ║         ║      ║       ║       ║          ║                 ║
        ╚═══════╝ ╚═╝        ╚═╝ ╚═╝        ╚══════╝  ╚══════╝      ╚═╝      ╚═══════╝  ╚══════╝   ╚══════╝
    _________________________________________________________________________________________________________
    `
  );
  promptOne();
});

// Function that creates a list of options for the user to select from
function promptOne() {
  inquirer
    .prompt({
      type: "list",
      name: "userSelection",
      message: "Please select what you want to do from the options provided!",
      choices: [
        "Add department",
        "View all department",
        "Add new role",
        "View all roles",
        "Add employee",
        "View all employees",
        "Browse employees by departments",
        "Change the role of an employee",
        "Delete employees",
        "End",
      ],
    })
    .then(function (userAnswer) {
      console.log(userAnswer);

      if (userAnswer.userSelection === "View all employees") {
        viewAllEmployees();
      } else if (userAnswer.userSelection === "View all department") {
        viewAllDepartments();
      } else if (userAnswer.userSelection === "View all roles") {
        viewAllRoles();
      } else if (
        userAnswer.userSelection === "Browse employees by departments"
      ) {
        browseEmployeesByDepartment();
      } else if (userAnswer.userSelection === "Add new role") {
        addNewRole();
      } else if (userAnswer.userSelection === "Add employee") {
        addNewEmployee();
      } else if (userAnswer.userSelection === "Add department") {
        addNewDepartment();
      } else if (
        userAnswer.userSelection === "Change the role of an employee"
      ) {
        updateEmployeeRole();
      } else if (userAnswer.userSelection === "Delete employees") {
        deleteEmployees();
      } else {
        connection.end();
      }
    });
}

// Function that returns all employees
function viewAllEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
    function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      // re-prompt the user for another selection
      promptOne();
    }
  );
}

// Function that returns all departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    // re-prompt the user for another selection
    promptOne();
  });
}

// Function that returns all roles
function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    // re-prompt the user for another selection
    promptOne();
  });
}

// Function that returns employees based on their department
function browseEmployeesByDepartment() {
  console.log("Viewing employees by department\n");

  var query = `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map((data) => ({
      value: data.id,
      name: data.name,
    }));

    console.table(res);
    console.log("Department view succeed!\n");

    promptDepartment(departmentChoices);
  });
}

// Function for prompting the user to choose department and returns employee based on the user choice
function promptDepartment(departmentChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you choose?",
        choices: departmentChoices,
      },
    ])
    .then(function (answer) {
      console.log("answer ", answer.departmentId);

      var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
    FROM employee e
    JOIN role r
      ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    WHERE d.id = ?`;

      connection.query(query, answer.departmentId, function (err, res) {
        if (err) throw err;

        console.table("response ", res);
        console.log(res.affectedRows + "Employees are viewed!\n");

        promptOne();
      });
    });
}

// insert data functions

var roleChoices = [];
var employeeChoices = [];
var departmentChoices = [];

function lookupRole() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      roleChoices.push(data[i].id + "-" + data[i].title);
    }
  });
}

function lookupEmployee() {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      employeeChoices.push(
        data[i].id + "-" + data[i].first_name + data[i].last_name
      );
    }
  });
}

function lookupDepartment() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      departmentChoices.push(data[i].id + "-" + data[i].name);
    }
  });
}

// Add new role
function addNewRole() {
  lookupRole();
  lookupEmployee();
  lookupDepartment();
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What new role do you want to add?",
      },
      {
        name: "department",
        type: "list",
        message: "What department would you like to add this role to?",
        choices: departmentChoices,
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary of the new role?",
        choices: departmentChoices,
      },
    ])
    .then(function (userAnswer) {
      console.log(`${userAnswer.role}`);
      var getDepartmentId = userAnswer.department.split("-");
      var query = `INSERT INTO role (title, salary, department_id)
      VALUES ('${userAnswer.role}','${userAnswer.salary}','${getDepartmentId[0]}')`;
      connection.query(query, function (err, res) {
        console.log(`<br>`),
          console.log(
            `===== The new role ${userAnswer.role} has sucussfully been added!  =====`
          );
      });
      promptOne();
    });
}

// Add new employee
function addNewEmployee() {
  lookupEmployee();
  lookupRole();

  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the first name of the new employee you want to add",
      },

      {
        name: "last_name",
        type: "input",
        message: "Enter the last name of the new employee you want to add",
      },

      {
        name: "role",
        type: "list",
        message: "Please select the employee's role from the following list",
        choices: roleChoices,
      },

      {
        name: "directed_by",
        type: "list",
        message: "Please select the employee's manager from the following list",
        choices: employeeChoices,
      },
    ])
    .then(function (userAnswer) {
      console.log(`${userAnswer.role}`);

      var getRoleId = userAnswer.role.split("-");
      var getDirected_byId = userAnswer.directed_by.split("-");
      var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${userAnswer.first_name}', '${userAnswer.last_name}', '${getRoleId[0]}', '${getDirected_byId[0]}')`;
      connection.query(query, function (err, res) {
        console.log(``),
          console.log(
            `\n\n\n ===== The new employee ${userAnswer.first_name} ${userAnswer.last_name} has been added successfully! =====`
          );
      });
      promptOne();
    });
}

// Add department
function addNewDepartment() {
  lookupRole();
  lookupEmployee();
  lookupDepartment();

  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Please enter the dipartment's name you want to add: ",
      },
    ])
    .then(function (userAnswer) {
      var query = `INSERT INTO department (name)
        VALUES ('${userAnswer.department}')`;
      connection.query(query, function (err, res) {
        console.log(``),
          console.log(
            `\n\n\n ===== The new department ${userAnswer.department} has been added successfully! =====`
          );
      });
      promptOne();
    });
}

// Update the role of an employee
function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "employee_name",
          type: "list",
          message:
            "From the following list, select the employee's last name you would like to assign to a new role",
          choices: function () {
            var empListArr = [];
            res.forEach((res) => {
              empListArr.push(res.last_name);
            });
            return empListArr;
          },
        },
      ])
      .then(function (userAnswer) {
        console.log(userAnswer);
        var name = userAnswer.employee_name;

        connection.query("SELECT * FROM role", function (err, res) {
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message:
                  "Select the new role you want to assign to the employee from the following list",
                choices: function () {
                  var roleListArr = [];
                  res.forEach((res) => {
                    roleListArr.push(res.title);
                  });
                  return roleListArr;
                },
              },
            ])
            .then(function (userAnsewrForRole) {
              const role = userAnsewrForRole.role;
              console.log(role);

              connection.query(
                "SELECT * FROM role WHERE TITLE = ?",
                [role],
                function (err, res) {
                  if (err) throw err;
                  let role_id = res[0].id;

                  let query =
                    "UPDATE employee SET role_id = ? WHERE last_name = ?";
                  let values = [parseInt(role_id), name];

                  connection.query(query, values, function (err, res, fields) {
                    console.log(
                      ` \n\n\n ===== ${name}'s role has been updated  to ${role}. ===== \n `
                    );
                  });
                  viewAllEmployees();
                }
              );
            });
        });
      });
  });
}

// Delete employees.
function deleteEmployees() {
  var query = `SELECT e.id, e.first_name, e.last_name
  FROM employee e`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const removeEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    console.table(res);
    console.log("empListArrToBeDeleted!\n");

    promptRemove(removeEmployeeChoices);
  });
}

// Prompt user to select the employee to be deleted
function promptRemove(removeEmployeeChoices) {
  inquirer
    .prompt([
      {
        name: "empId",
        type: "list",
        message:
          "Select the employee you want to remove from the following list",
        choices: removeEmployeeChoices,
      },
    ])
    .then(function (userAnswer) {
      var query = `DELETE FROM employee WHERE ?`;

      connection.query(query, { id: userAnswer.empId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(
          res.affectedRows + " " + "Employee has been successfully deleted!\n"
        );

        promptOne();
      });
    });
}
