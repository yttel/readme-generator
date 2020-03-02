const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown.js");

const questions = [{
  type: "input",
  message: "What is your GitHub username?",
  name: "name"
},{
  type: "input",
  message: "What is the name of your project?",
  name: "title"
},{
  type: "input",
  message: "Please write a short description of the project:",
  name: "description"
},{
  type: "input",
  message: "What kind of license does your project have?",
  name: "license"
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

inquirer
    .prompt(questions).then(function(data){
        const {username} = data;

        const queryURL = `https://api.github.com/users/${username}`;

        axios.get(queryURL).then(function(response){
            const {name, bioImg, email} = response;
            
            //create string for insertion
            const markdownText = generateMarkdown(data, name, bioImg, email);
          
            //write new file
            fs.writeFile("readMe.md", markdownText, function(err){
              if (err) {
                  throw err;
              } 
              else {
                  console.log("ReadMe successfully created!");
              }
            });
        });
});


