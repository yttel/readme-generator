const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
//const makeMD = require("./generateMD.js"); fml syntax

const questions = [{
  type: "input",
  message: "What is your GitHub username?",
  name: "username"
},{
  type: "input",
  message: "What is the name of your project?",
  name: "title"
},{
  type: "input",
  message: "Please write a short description of the project:",
  name: "description"
},{
  type: "list",
  message: "What kind of license does your project have?",
  name: "license",
  choices: [
    "MIT", 
    "MPL 2.0", 
    "Perl", 
    "None"
  ]
},{
  type: "input",
  message: "What command installs dependencies?",
  name: "depCommand"
},{
  type: "input",
  message: "What does the user need to know about using this repo?",
  name: "repoUse"
},{
  type: "input",
  message: "What does the user need to know about contributing?",
  name: "contribute"
},{
  type: "input",
  message: "What command runs tests?",
  name: "testCommand"
}];

function generateMarkdown(data, name, bioImg, email) {
  const {username, title, description, license, depCommand, repoUse, testCommand, contribute} = data;

  let contact;
  let badge;
  let licenseText = `This project is licensed under the ${license} license.`;

  //license & badge info
  switch(license) {
    case "MPL 2.0":
      badge = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
      break;

    case "Perl":
      badge = `[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`;
      break;

    case "MIT":
      badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
      break;

    case "None":
      badge = "";
      licenseText = "This project is not currently licensed."
      break;
  
    default:
      badge = "BROKEN";
  }

  if (!email){
    contact = `[GitHub](https://github.com/${username} "GitHub for ${username}")`
  }
  else {
    contact = `${email}`
  }
  return `
  # ${title}

  ${badge}

  [Link to GitHub repo](https://github.com/${username}/${title})
  
  ## Description
  
  ${description}
  
  ## Table of Contents
  
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## Installation
  
  To install required dependencies, run the following command(s):
  ~~~~
  ${depCommand}
  ~~~~
  
  ## Usage
  
  ${repoUse}
  
  ## License
  
  ${licenseText}
  
  ## Contributing
  
  ${contribute}
  
  ## Tests
  
  To run tests, run the following command(s):
  ~~~~
  ${testCommand}
  ~~~~
  
  ## Questions
  
  ![headshot image](${bioImg} "${name}")
  
  If you have any questions about this repository, please contact ${name} directly via ${contact}.
  
`;
}

inquirer
  .prompt(questions).then(function(data){
    const {username} = data;

    const queryURL = `https://api.github.com/users/${username}`;

    axios.get(queryURL).then(function(response){
        console.log(response.data);
        const {name, avatar_url, email} = response.data;

        //create string for insertion
        const markdownText = generateMarkdown(data, name, avatar_url, email);
      
        //write new file
        fs.writeFile("./Generated/README.md", markdownText, function(err){
          if (err) {
              throw err;
          } 
          else {
              console.log("ReadMe successfully created!");
          }
        });
    });
});


