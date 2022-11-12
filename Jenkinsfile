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
                bat encoding: 'ASCII', returnStatus: true, script: 'wdio-headless'
            }
        }
    }
}
