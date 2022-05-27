// Importing the required packages that we installed into the node_module
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// Setting up a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",

  // Using your own port number is an option if you do not want to use the default one
  port: 3306,

  //Enter your password within the citation
  password: "MYSQL@pass123",
  database: "employeesDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log(
    `_______________________________________________________________________________________________
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
