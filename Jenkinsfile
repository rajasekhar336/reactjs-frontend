pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "react-php/frontend"
        AWS_REGION = 'ap-south-1'
        ECR_REPO = "075884725528.dkr.ecr.ap-south-1.amazonaws.com/react-php/frontend"
        HELM_RELEASE_NAME = "react-frontend-release"
        K8S_NAMESPACE = "default"
        CLUSTER_NAME = "react-php"
        KUBECONFIG_PATH = "./kubeconfig"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    sh """
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
                    """
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    sh """
                    docker tag $DOCKER_IMAGE:latest $ECR_REPO:latest
                    docker push $ECR_REPO:latest
                    """
                }
            }
        }

        stage('Download Kubeconfig') {
            steps {
                script {
                    sh """
                    aws eks update-kubeconfig --name $CLUSTER_NAME --region $AWS_REGION --kubeconfig $KUBECONFIG_PATH
                    """
                }
            }
        }

        stage('Deploy to AWS EKS') {
            steps {
                script {
                    sh """
                    export KUBECONFIG=$KUBECONFIG_PATH
                    helm upgrade --install $HELM_RELEASE_NAME ./reactjs-frontend --namespace $K8S_NAMESPACE -f ./reactjs-frontend/values.yaml
                    """
                }
            }
        }
    }

    post {
        success {
            echo "React frontend deployed successfully!"
        }

        failure {
            echo "React frontend deployment failed."
        }
    }
}

