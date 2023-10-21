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
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $DEPLOY_SSH_KEY ubuntu@34.221.182.170 '
                           if [ ! -d "todos-app" ]; then
                                git clone https://github.com/AhmadMazaal/todos-app.git
                                cd todos-app
                            else
                                cd todos-app
                                git pull
                            fi
                            yarn install
                            yarn start &
                        '
                    '''
                }
        }
    }
}
