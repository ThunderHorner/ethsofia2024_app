pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'git@github.com:ThunderHorner/ethsofia2024_app.git'
        DOCKER_SERVER = 'thunderhorn@192.168.0.103'
        REMOTE_DIR = '/home/thunderhorn/ethsofia2024_app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', credentialsId: '10', url: "${env.GIT_REPO_URL}"
            }
        }

        stage('SSH to Server and Deploy') {
            steps {
                script {
                    sshagent(['15']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${DOCKER_SERVER} '
                            rm -rf ${REMOTE_DIR} &&
                            mkdir -p ${REMOTE_DIR}'

                        scp -r ./* ${DOCKER_SERVER}:${REMOTE_DIR}/

                        ssh -o StrictHostKeyChecking=no ${DOCKER_SERVER} '
                            cd ${REMOTE_DIR} && ./build.sh'
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}