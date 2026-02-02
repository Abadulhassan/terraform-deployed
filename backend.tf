terraform {
  backend "s3" {
    bucket         = "terraform-state-lab-2026"
    key            = "jenkins-lambda-api/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}
