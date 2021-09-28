# CHEATSHEET
## Testing
We should follow the conventions: Place Source files in src folder and tests typescript files in tests folder. Structure directories right from the start to avoid having to change paths later.

## PYTHON : UNITTEST
### Set up
* import unittest

To run tests:
* python [testscript_name].py
* the '-v' option shows more info in terminal
* the '-m' option lets you run tests from modules, classes  or individual test-methods 
  * python -m unittest test_module1 test_module2
  * python -m unittest test_module.TestClass
  * python -m unittest test_module.TestClass.test_method

## JAVASCRIPT : JEST
We will use Jest to write unit tests in JavaScript: https://jestjs.io/

Guide Jest with React (Snapshot, Mocks, DOM etc.): https://jestjs.io/docs/tutorial-react 

Node.js?

npm?

### Set up
* (To make sure you have the latest npm version: 'npm install -g npm')
* Install jest: 'npm install --save-dev jest'
* Set up config: 'jest --init'
* To run jest from CLI: 'npm install jest --global'
* Running all tests: 'npm test'
* Running specific modules: 'npm test -- [name-identifier]'

Create test suites in modules maned [name].test.js 