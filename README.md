# WebdriverIO-implementation-of-Hardcore-task
 
The Page object model implemented, 
There are three test suites (smoke, critical path, end2end) added,
The environments and reporters added.
The screenshot on failure added.
Reporters: allure, HTML, junit.
Github actions added
Jenkinsfile added
GitlabCI yml file added
Travis yml file added
Custom command in before hook
Chai: assert and should added
Allure report publish on Github Pages added

To run smoke tests - npm run smoke
To run criticalPath - npm run criticalPath
to run e2e - npm run e2e
To run headless (smoke suite) - npm run test-headless
ENV parameters environement (qa|dev|stage|prod) regoin (FRANKFURT|COLUMBUS)
To run parametrized npx cross-env ENV=(qa|dev|stage|prod) REG=(FRANKFURT|COLUMBUS) npm run wdio --(smoke|criticalPath|end2end)