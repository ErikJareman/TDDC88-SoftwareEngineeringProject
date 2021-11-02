# About

This file will give a quick instruction on how to get the development build up and running.

## Clone the project

Open up a terminal, navigate to where you would like to put the repository and type:

- To clone with SSH: `git clone git@gitlab.liu.se:tddc88-company-4-2021/emergency-journal-application.git`
- To clone with HTTPS: `git clone https://gitlab.liu.se/tddc88-company-4-2021/emergency-journal-application.git`

## Start the application

In order to start the application (development build), you will need to have node.js installed. If you don't have node.js installed on your computer, go to `https://nodejs.org/en/download/` and install the Latest LTS version of node.js. If you have node.js installed, do the following:

1. Enter the repository by typing `cd emergency-journal-application` in a terminal
2. Enter the Deveopment branch by typing `git checkout development`
3. Enter the application directory by typing `cd app`
4. Install dependencies with `npm install`
5. Start the application with `npm start`

This should lock the terminal and open a web-browser with the application running. The application will be running on localhost::3000.
