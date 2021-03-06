const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//blank array to push employee objects to
let employeeArr = []

//function to promt user for data on employees
function propmtUser() {
    inquirer
        .prompt([
        {   
            type: 'input',
            message: `What is the person's name?`,
            name: 'name',
        },
        {   
            type: 'input',
            message: `What is the person's Id?`,
            name: 'Id',
        },
        {   
            type: 'input',
            message: `What is the person's email?`,
            name: 'email',
        },
        {   
            type: 'list',
            message: "What is the person's role?",
            name: 'role',
            choices: ["intern", "engineer", "manager"],
        },
        // 'When' code from: https://stackoverflow.com/questions/56412516/conditional-prompt-rendering-in-inquirer
        {
            type: "input",
            message: "What school does the intern go to?",
            name: 'school',
            when: (answers) => answers.role === 'intern'
        },
        {
            type: "input",
            message: "What is the engineer's github Id?",
            name: 'github',
            when: (answers) => answers.role === 'engineer'
        },     
        {
            type: "number",
            message: "What is the manager's office number?",
            name: 'officeNumber',
            when: (answers) => answers.role === 'manager'
        },
        ])
        
        //switch statement to handle different role types and then prompt the user to add more employees or not
        .then((answers) => {
           switch(answers.role) {
               case "intern":
                   let newIntern = new Intern(answers.name, answers.Id, answers.email, answers.school)
                   employeeArr.push(newIntern)
                   inquirer.prompt(
                       {
                           type: 'list',
                           message: "Do you want to add another employee?",
                           name: "repeat",
                           choices: ["yes", 'no']
                        })
                        //code to repeat questions or render all employees into an html page
                        .then((answer) => {
                            if (answer.repeat === "yes") {
                                propmtUser();
                            } else {
                                console.log("All employees added, rendering html...")
                                let data = render(employeeArr);
                                fs.writeFile(outputPath, data, function(err){
                                    if (err) return console.log(err);
                                })
                            }
                        })
                   break;

                case "engineer":
                    let newEngineer = new Engineer(answers.name, answers.Id, answers.email, answers.github)
                    employeeArr.push(newEngineer)
                    inquirer.prompt(
                        {
                            type: 'list',
                            message: "Do you want to add another employee?",
                            name: "repeat",
                            choices: ["yes", 'no']
                         })
                         //code to repeat questions or render all employees into an html page
                         .then((answer) => {
                            if (answer.repeat === "yes") {
                                propmtUser();
                            } else {
                                console.log("All employees added, rendering html...")
                                let data = render(employeeArr);
                                fs.writeFile(outputPath, data, function(err){
                                    if (err) return console.log(err);
                                })
                            }
                        })
                    break;

                case "manager":
                    let newManager = new Manager(answers.name, answers.Id, answers.email, answers.officeNumber)
                    employeeArr.push(newManager)
                    inquirer.prompt(
                        {
                            type: 'list',
                            message: "Do you want to add another employee?",
                            name: "repeat",
                            choices: ["yes", 'no']
                         })
                         //code to repeat questions or render all employees into an html page
                         .then((answer) => {
                            if (answer.repeat === "yes") {
                                propmtUser();
                            } else {
                                console.log("All employees added, rendering html...")
                                let data = render(employeeArr);
                                fs.writeFile(outputPath, data, function(err){
                                    if (err) return console.log(err);
                                })
                            }
                        })
                    break;
           }
        })
    }

propmtUser(); 


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
