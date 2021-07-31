# AWS Lambda Secrets Manager Example: 2 Ways to Grant Access | Resource Permissions

[YouTube Tutorial]()

## 1. Create Secret in AWS Secrets Manager
- Create `SLACK_BOT_TOKEN` secret
- Give it a name `prod/bot/token`
## 2. Create IAM User with Full Access
- Create `admin` user and place it in `Admin` IAM group
- Configure aws
## 3. Create IAM Role for AWS Lambda
- Create IAM Policy `AWSLambdaSecretsAccess`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:424432388155:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:us-east-1:424432388155:log-group:/aws/lambda/secret-access:*"
        }
    ]
}
```
- Create `secret-access-role` IAM Role
## 4. Create AWS Lambda Function
- Create function
## 5. Deploy Lambda Using Container Image
- Create ECR `secret-access`
- Deploy
## 6. Grant Access for IAM Role
## 7. Create Resource-based Policy for Secret





aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 424432388155.dkr.ecr.us-east-1.amazonaws.com
docker build -t 424432388155.dkr.ecr.us-east-1.amazonaws.com/secret-access:latest .
docker push 424432388155.dkr.ecr.us-east-1.amazonaws.com/secret-access:latest

{
  "Version" : "2012-10-17",
  "Statement" : [ {
    "Effect" : "Allow",
    "Principal" : {
      "AWS" : "arn:aws:sts::424432388155:assumed-role/node-role-lyj43ki2/node"
    },
    "Action" : "secretsmanager:GetSecretValue",
    "Resource" : "*"
  } ]
}

{
    "Effect": "Allow",
    "Action": "secretsmanager:GetSecretValue",
    "Resource": "arn:aws:secretsmanager:us-east-1:424432388155:secret:prod/some-IwZrh6"
}


node-role
AWSLambdaSecretsAccess


## Clean UP
- Delete `admin` IAM user
- Delete ECR `secret-access`
- Deete `secret-access-role` IAM Role
- Delete `AWSLambdaSecretsAccess` IAM Policy

## Links
Resource-based policies (Principal): https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html
Resource-based policies: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_resource-policies.html
