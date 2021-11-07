# CHEATSHEET TESTING

## JAVASCRIPT : JEST
Most of our tests will be writen in JavaScript and we will use Jest to write unit tests in JavaScript: https://jestjs.io/. This goes for both unit- and regression testing.

### In order to install testing dependencies you need to:
1. Go to emergency-journal-application/app/testing
2. Type 'npm install' in terminal

### In order to run the regression tests you need to:
1. Start the application
2. Open a new terminal and go to emergency-journal-application/app/testing
3. Run the tests:
* Running all tests: 'npm test'
* Running specific modules: 'npm test -- [name-identifier]' (ie 'npm test -- 1' to run all test suites containing a '1' in the file-name)

OBS! The web-driver in the repo is for Chrome version 95.0.4638.54. If you use another version of Chrome you will either have to update your Chrome to the version above, or download another web-driver for the version of Chrome you are using. You can click on the 'Chrome' tab and then on 'About Google Chrome' to find out what version you are using. OBS!

## PYTHON : UNITTEST
Some might want to write tests in Python and for this we will use 'unittest' by Python.

### Set up
* import unittest (in test-file)

### In order to run the tests:
* Type python [testscript_name].py in terminal
* the '-v' option shows more info in terminal
* the '-m' option lets you run tests from modules, classes