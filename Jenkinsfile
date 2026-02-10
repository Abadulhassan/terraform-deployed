pipeline {
    agent any

    environment {
        TF_IN_AUTOMATION = "true"
    }

    parameters {
        choice(
            name: 'ACTION',
            choices: ['plan', 'apply', 'destroy'],
            description: 'Terraform action to execute'
        )
    }

    stages {

        stage('Checkout Code') {
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
            when {
                expression { params.ACTION == 'plan' || params.ACTION == 'apply' }
            }
            steps {
                sh 'terraform plan -input=false -out=tfplan'
            }
        }

        stage('Approval Before Apply') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                input message: 'Approve Terraform Apply?', ok: 'Deploy'
            }
        }

        stage('Terraform Apply') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sh 'terraform apply -input=false -auto-approve tfplan'
            }
        }

        stage('Approval Before Destroy') {
            when {
                expression { params.ACTION == 'destroy' }
            }
            steps {
                input message: 'WARNING: Destroy entire infrastructure?', ok: 'Destroy'
            }
        }

        stage('Terraform Destroy') {
            when {
                expression { params.ACTION == 'destroy' }
            }
            steps {
                sh 'terraform destroy -input=false -auto-approve'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
