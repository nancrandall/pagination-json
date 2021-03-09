@Library('jenkins-shared-libraries-v2@master') _
import groovy.json.JsonSlurperClassic
pipeline {
    agent any

    stages {
      stage('Initialization') {
          steps {
            deleteDir()
            checkout scm
              script {
                echo "[INFO] Loading JSON configuration from : ${env.WORKSPACE}/pipeline_node_libs.json"
                inputFile = readFile("${env.WORKSPACE}/pipeline.json")
                parsedJson = new JsonSlurperClassic().parseText(inputFile)
                echo "[INFO] Done Loading JSON configuration"
                timer = BuildCause()
            }
          }
      }

      stage('Build NPM'){
        steps{
            BuildNpm(parsedJson)
            //If using YARN as build tool use below BuildYarn(parsedJson)
        }
      }
  }
  post {
		success {
			Notify([message:"SUCCESS",
				build_status: "SUCCESS" ])
		}
		failure {
			Notify([message:"FAILED",
				build_status: "FAILED" ])
		}
	}
}