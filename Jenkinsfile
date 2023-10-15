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

        stage('Deploy to Production') {
            steps {
                script {
                    sh '''
                    ssh -i /home/ubuntu/todos-app-jenkins.pem ubuntu@34.216.224.145 '
                        cd /destination/path/on/second/instance/
                        git pull origin your-branch-name
                        yarn install
                        yarn start &
                    '
                    '''
                }
            }
        }

    }
}
