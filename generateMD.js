function generateMarkdown(data, name, bioImg, email) {
  const {username, title, description, license, depCommand, repoUse, testCommand, contribute} = data;

  let contact;

  if (!email){
    contact = `[GitHub](https://github.com/${username} "GitHub for ${username}")]`
  }
  else {
    contact = `${email}`
  }
  return `
  # ${title}

  [[GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/${username}/${title})
  
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
  
  This project is licensed under the ${license} license.
  
  ## Contributing
  
  ${contribute}
  
  ## Tests
  
  To run tests, run the following command(s):
  ~~~~
  ${testCommand}
  ~~~~
  
  ## Questions
  
  ![headshot image](${bioImg} "${name}")
  
  If you have any questions about this repository, please contact ${name} directly via ${concact}.
  
`;
}

module.exports = generateMarkdown;