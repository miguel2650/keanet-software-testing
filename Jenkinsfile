#!/bin/groovy
pipeline {
  tools {
    nodejs 'default'
  }
  agent any
  stages {
    stage('Startup') {
      steps {
        script {
          sh 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        script {
          sh 'npm run test'
        }
      }
      post {
        always {
          junit 'output/coverage/junit/junit.xml'
        }
      }
    }
    stage('Build') {
      steps {
        script {
          sh 'npm start'
          sh 'npm pack'
        }
      }
    }
    stage('Deploy') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      steps {
        script {
          def server = Artifactory.server 'My_Artifactory'
          uploadArtifact(server)
        }
        script {
            if(env.BRANCH_NAME == 'master'){
            sh 'docker build -t react-app --no-cache .'
            sh 'docker tag react-app localhost:5000/react-app'
            sh 'docker push localhost:5000/react-app'
            sh 'docker rmi -f react-app localhost:5000/react-app'
            }
        }
      }
    }
  }
}
def uploadArtifact(server) {
  def uploadSpec = """{
            "files": [
              {
                "pattern": "continuous-test-code-coverage-guide*.tgz",
                "target": "npm-stable/"
              }
           ]
          }"""
  server.upload(uploadSpec)
  def buildInfo = Artifactory.newBuildInfo()
  server.upload spec: uploadSpec, buildInfo: buildInfo
  server.publishBuildInfo buildInfo
}