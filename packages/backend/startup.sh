#!/bin/bash

# Function to check PostgreSQL connection
check_postgres_connection() {
  python -c "
import psycopg2
import os
try:
    connection = psycopg2.connect(
        dbname=os.getenv('DATABASE_URL').split('/')[-1],
        user=os.getenv('DATABASE_URL').split(':')[1].split('//')[1],
        password=os.getenv('DATABASE_URL').split(':')[2].split('@')[0],
        host=os.getenv('DATABASE_URL').split('@')[1].split(':')[0],
        port=os.getenv('DATABASE_URL').split(':')[-1]
    )
    connection.close()
    print('Successfully connected to PostgreSQL')
except Exception as e:
    print(f'Failed to connect to PostgreSQL: {e}')
    exit(1)
"
}

# Function to check S3 connection
check_s3_connection() {
  python -c "
import boto3
import os
try:
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION')
    )
    
    bucket_name = os.getenv('S3_BUCKET_NAME')
    if not bucket_name:
        raise ValueError('S3_BUCKET_NAME environment variable is not set')
    s3.head_bucket(Bucket=bucket_name)
    print(f'Successfully connected to S3 bucket: {bucket_name}')
except Exception as e:
    print(f'Failed to connect to S3: {e}')
    exit(1)
"
}

# Check connections
# check_postgres_connection
check_s3_connection

# Start the main application
exec "$@"