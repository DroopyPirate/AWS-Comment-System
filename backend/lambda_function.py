import json
import boto3
import uuid
from botocore.exceptions import ClientError

# Initialize DynamoDB Resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserComments')

def lambda_handler(event, context):
    # CORS Headers
    headers = {
        'Access-Control-Allow-Origin': '*',  # Or specify a specific domain
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    httpMethod = event['httpMethod']

    if httpMethod == 'POST':
        body = json.loads(event['body'])
        comment = body.get('comment')
        user = body.get('user', 'Anonymous')

        if not comment:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Comment is required'})
            }

        comment_id = str(uuid.uuid4())

        item = {
            'CommentId': comment_id,
            'comment': comment,
            'user': user
        }

        try:
            table.put_item(Item=item)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'Comment added successfully', 'CommentId': comment_id})
            }
        except ClientError as e:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': str(e)})
            }

    elif httpMethod == 'GET':
        try:
            response = table.scan()
            comments = response.get('Items', [])

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(comments)
            }
        except ClientError as e:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': str(e)})
            }
    
    elif httpMethod == 'DELETE':
        try:
            body = json.loads(event['body'])
            comment_id = body.get('CommentId')

            if not comment_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'CommentId is required'})
                }
            
            response = table.delete_item(
                Key={'CommentId': comment_id}
            )

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'Comment deleted successfully'})
            }
        except ClientError as e:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': str(e)})
            }

    elif httpMethod == 'OPTIONS':  # CORS preflight request
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight response'})
        }

    else:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Invalid HTTP method'})
        }
