pipeline {
    agent any

    environment {
        TF_IN_AUTOMATION = "true"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Abadulhassan/terraform-deployed.git'
            }
        }

        stage('Terraform Init') {
            steps {
                sh 'terraform init -input=false'
            }
        }

        stage('Terraform Validate') {
            steps {
                sh 'terraform validate'
            }
        }

        stage('Terraform Plan') {
            steps {
                sh 'terraform plan -input=false -out=tfplan'
            }
        }

        stage('Terraform Apply') {
            steps {
                sh 'terraform apply -input=false -auto-approve tfplan'
            }
        }
    }
}
