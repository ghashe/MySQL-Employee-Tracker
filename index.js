// Importing the required packages that we installed into the node_module
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { lookup } = require("dns");
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
                               ║   ABYOU'S          V  E  T       C L I N I C K   ║                        
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
        "View all employees",
        "View all department",
        "Browse employees by departments",
        "Adding a new role",
        "Add employee",
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
      } else if (
        userAnswer.userSelection === "Browse employees by departments"
      ) {
        browseEmployeesByDepartment();
      } else if (userAnswer.userSelection === "Adding a new role") {
        addNewRole();
      } else if (userAnswer.userSelection === "Add employee") {
        addEmployee();
      } else if (
        userAnswer.userSelection === "Change the role of an employee"
      ) {
        changeEmployeeRole();
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
