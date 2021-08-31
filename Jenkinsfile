pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim' 
            args '-p 3001:3001' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        // stage('Production') {
        //     steps {
        //         withAWS(region:'Bulgaria', credentials:'1k2estate34') {
        //             s3Delete(bucket: 'Estate app', path:'**/*')
        //             s3Upload(bucket: 'Estate app', workingDir:'build', includePathPattern:'**/*');
        //         }
        //     }
        // }
    }
}