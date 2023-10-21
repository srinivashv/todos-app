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
                    sleep 10
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

        stage('Cleanup') {
            steps {
                script {
                    sh 'pkill -f "node"'
                }
            }
        }

        stage('Deploy') {
                environment {
                    DEPLOY_SSH_KEY = credentials('AWS_INSTANCE_SSH')
                }
                steps {
                    sh '''
                        ssh -i $DEPLOY_SSH_KEY ubuntu@52.38.17.92 '
                            cd/
                            if [ ! -d "todos-app" ]; then
                                git clone https://github.com/AhmadMazaal/todos-app.git todos-app
                                cd todos-app
                            else
                                cd todos-app
                                git pull
                            fi
                            yarn install
                            if pm2 describe toods-app > /dev/null ; then
                            pm2 restart toods-app
                            else
                                yarn start:pm2
                            fi
                        '
                    '''
                }
            }
    }
}
