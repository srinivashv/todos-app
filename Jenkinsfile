pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }


    stages {
        stage('Install Packages') {
            steps {
                script {
                    sh 'yarn install'
                }
            }
        }

        stage('Run the App') {
            steps {
                script {
                    sh 'yarn start &'
                    sleep 5
                }
            }
        }

        stage('Test the app') {
            steps {
                script {
                    sh 'curl http://localhost:3000/health'
                }
            }
        }

        stage('Deploy') {
                environment {
                    DEPLOY_SSH_KEY = credentials('AWS_INSTANCE_SSH')
                }
            steps {
                
                withCredentials([sshUserPrivateKey(credentialsId: 'AWS_INSTANCE_SSH', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        ssh -i ${SSH_KEY} ubuntu@54.202.58.222 '
                            if [ ! -d "/todos-app" ]; then
                                git clone http://github.com/AhmadMazaal/todos-app /todos-app
                            fi
                            cd /todos-app
                            git pull
                            yarn install
                            yarn start &
                        '
                    """
                }
            }
        }

    }
}
