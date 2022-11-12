# WebdriverIO-implementation-of-Hardcore-task
 
1. The Page object model implemented, 
2. There are three test suites (smoke, critical path, end2end) added,
3. The environments and reporters added.
4. The screenshot on failure added.
5. Reporters: allure, HTML, junit.
6. Github actions added
7. Jenkinsfile added
8. GitlabCI yml file added
9. Travis yml file added
10. Custom command in before hook
11. Chai: assert and should added
12. Allure report publish on Github Pages added

### To run smoke tests - npm run smoke
### To run criticalPath - npm run criticalPath
### To run e2e - npm run e2e
### To run headless (smoke suite) - npm run test-headless

## Environment variables: 

ENV parameters environement (qa|dev|stage|prod) region (FRANKFURT|COLUMBUS) browser (chrome | msedge )

To run parametrized npx cross-env ENV=(qa|dev|stage|prod) REG=(FRANKFURT|COLUMBUS) BROWSER=(chrome|msedge) npm run wdio --(smoke|criticalPath|end2end)