pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git branch: 'main', url: 'https://github.com/Valiantsin2021/WebdriverIO-implementation-of-Hardcore-task.git'
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('smoke') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npx cross-env ENV=qa && npx cross-env REG=FRANKFURT && npx cross-env BROWSER=chrome && npm run wdio'
            }
        }
        stage('Generate allure report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
