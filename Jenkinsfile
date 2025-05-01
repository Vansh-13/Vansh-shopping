pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo 'Cloning code from GitHub...'
                git url: 'https://github.com/Vansh-13/Vansh-shopping.git', branch: 'main' // Adjust branch name if needed
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t vansh:latest .'  // Use 'sh' if running on Linux or macOS
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing Docker image to DockerHub...'
                withCredentials([usernamePassword(credentialsId: 'dockerHub', usernameVariable: 'dockerHubUser', passwordVariable: 'dockerHubPass')]) {
                    bat 'docker tag vansh:latest %dockerHubUser%/vansh:latest'  // Change to 'sh' for Linux/macOS
                    bat 'echo %dockerHubPass% | docker login -u %dockerHubUser% --password-stdin'  // Change to 'sh' for Linux/macOS
                    bat 'docker push %dockerHubUser%/vansh:latest'  // Change to 'sh' for Linux/macOS
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application...'
                bat '''
                    docker-compose down
                    for /f "tokens=*" %%i in ('docker ps -a -q --filter "name=online_shop"') do docker rm -f %%i
                    docker-compose up -d
                ''' // Use 'sh' for Linux/macOS
            }
        }
    }
}
