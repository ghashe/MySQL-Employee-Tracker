// Importing the required packages that we installed into the node_module
const mysql = require("mysql2");
const inquirer = require("inquirer");
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
    `    _______________________________________________________________________________________________

        ╔═══════╗  ╔═       ═╗   ╔══════╗  ╔         ╔══════╗   ═══   ═══   ╔══════╗   ╔══════╗
        ║          ║  "   "  ║   ║      ║  ║         ║      ║     "   "     ║          ║
        ║          ║   " "   ║   ║══════╝  ║         ║      ║      " "      ║          ║
        ║══════╣   ║    ═    ║   ║         ║         ║      ║       "       ║══════╣   ║══════╣
        ║          ║         ║   ║         ║         ║      ║       ║       ║          ║
        ║          ║         ║   ║         ║         ║      ║       ║       ║          ║
        ╚═══════╝ ╚═╝       ╚═╝ ╚═╝        ╚══════╝  ╚══════╝      ╚═╝      ╚═══════╝  ╚══════╝
    ________________________________________________________________________________________________
    `
  );
});
