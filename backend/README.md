# 🧠 Backend – AWS Lambda & DynamoDB

This folder contains everything you need to configure the **UserComments** DynamoDB table and the **CommentController** Lambda function that powers the `/comments` API.

---

## 📦 Files

| File                   | Purpose                                    |
|------------------------|--------------------------------------------|
| `lambda_function.py`   | Python handler (GET, POST, DELETE, OPTIONS) |

---

## 1. Create the DynamoDB Table

1. Open the [DynamoDB Console](https://console.aws.amazon.com/dynamodb).  
2. Click **Create table**.  
3. Configure the new table:  
   - **Table name**: `UserComments`  
   - **Partition key**:  
     - Name: `CommentId`  
     - Type: **String**  
4. Leave all other settings (Read/Write capacity, encryption, TTL) at their defaults, then click **Create table**.  
5. Wait until the table status is **ACTIVE**.

---

## 2. Create the Lambda Function

1. Open the [Lambda Console](https://console.aws.amazon.com/lambda).  
2. Click **Create function** → **Author from scratch**.  
3. Set the following:  
   - **Function name**: `CommentController`  
   - **Runtime**: **Python 3.12**  
   - **Permissions**:  
     - Expand **Change default execution role**  
     - Choose **Create a new role with basic Lambda permissions**  
4. Click **Create function**.

---

## 3. Configure the Lambda Function

### 3.1. Add DynamoDB Permissions

1. In your function’s **Configuration** tab, click **Permissions**.  
2. Under **Execution role**, click the role name link.  
3. In the IAM Console, click **Attach policies**.  
4. Search for and select **AmazonDynamoDBFullAccess** → **Attach policy**.

### 3.2. Upload/Replace the Handler Code

1. Back in the Lambda Console, under the **Code** tab, open `lambda_function.py`.  
2. Replace its contents with the provided `lambda_function.py` (handles GET, POST, DELETE, OPTIONS).  
3. **Save** and click **Deploy**.

### 3.3. Test the Lambda Function
1. Click **Test** → **Configure test event**.
2. Select **Create new test event**.
3. Name it `TestEvent-<HttpMethod>`. The method can be GET POST DELETE whichever you want to test.
4. Add appropriate request JSON payload according to the method you are testing. For example, for each method, you can use:
   ```json
   //POST Method
   {
        "httpMethod": "POST",
        "body": "{\"comment\": \"This is a great website!\", \"user\": \"JohnDoe\"}"
   }

   //GET Methd
   {
        "httpMethod": "GET"
   }

   //DELETE Method
   {
        "httpMethod": "DELETE",
        "body": "{\"commentId\": \"commentId\"}"
   }

   //Invalid Method
   {
    "httpMethod": "PUT"
   }
   ```
5. Click **Test** to run the function.
6. Check the **Execution result** and **Logs** for any errors.
7. If you see an error, check the **Logs** for details.
8. This tests will be saved and can be used for future testings.
9. You can check the **DynamoDB** table to see if the data is being inserted or deleted.

---

## Step 4: Configure API Gateway

This section walks you through creating a REST API in API Gateway, wiring it up to your `CommentController` Lambda (proxy integration), and configuring CORS so your S3‑hosted frontend can call it.

---

### 4.1 Create the REST API

1. Open the [API Gateway Console](https://console.aws.amazon.com/apigateway).
2. Click **Create API** → **REST API** (Regional) → **Build**.
3. Enter:
   - **API name**: `CommentsAPI`
   - **Description**: (optional) “Handles user comments via Lambda & DynamoDB”
4. Click **Create API**.

---

### 4.2 Create the `/comments` Resource

1. In the left panel under **Resources**, select the root (`/`) node.
2. Click **Actions** → **Create Resource**.
3. Enter:
   - **Resource Name**: `comments`
   - **Resource Path**: `/comments`
   - Check **Enable API Gateway CORS**  
4. Click **Create Resource**.

---

### 4.3 Add Lambda Proxy Methods (GET, POST, DELETE)

For each of the methods **GET**, **POST**, and **DELETE**:

1. Select the `/comments` resource.
2. Click **Actions** → **Create Method** → choose **GET** (repeat for POST & DELETE).
3. Integration setup:
   - **Integration type**: Lambda Function
   - **Use Lambda Proxy integration**: ☑ checked
   - **Lambda Region**: your region (e.g. `us‑east‑1`)
   - **Lambda Function**: `CommentController`
4. Click **Save**, then **OK** when prompted to grant API Gateway permission.
5. **Enable CORS in Method Response**:
   1. Click **Method Response** for the method you just created.
   2. Under **HTTP Status** `200`, click the pencil icon next to **Response Headers**.
   3. Add a header named:
      ```
      Access-Control-Allow-Origin
      ```
   4. Click ✔ to save.

---

### 4.4 Create the OPTIONS “Preflight” Method

Browsers send an OPTIONS request before actual GET/POST/DELETE calls to check CORS. We’ll mock this:

1. Select the `/comments` resource.
2. Click **Actions** → **Create Method** → choose **OPTIONS**.
3. Integration setup:
   - **Integration type**: Mock
4. **Configure Method Response**:
   1. Click **Method Response**.
   2. Under **HTTP Status** `200`, click **Response Headers** and add the following four headers (no mapping values yet):
      - `method.response.header.Access-Control-Allow-Credentials`
      - `method.response.header.Access-Control-Allow-Headers`
      - `method.response.header.Access-Control-Allow-Methods`
      - `method.response.header.Access-Control-Allow-Origin`

5. **Configure Integration Response**:
   1. Click **Integration Response**.
   2. Expand the `200` status.
   3. Under **Header Mappings**, click **Add header** four times and enter:

      | Name                                        | Mapping value                                                                                         |
      |---------------------------------------------|-------------------------------------------------------------------------------------------------------|
      | `Access-Control-Allow-Credentials`          | `'true'`                                                                                              |
      | `Access-Control-Allow-Headers`              | `'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'`                               |
      | `Access-Control-Allow-Methods`              | `'GET,OPTIONS,POST,DELETE'`                                                                           |
      | `Access-Control-Allow-Origin`               | `'http://<s3-bucket-name>.s3-website-<region>.amazonaws.com'`                                           |
    
   4. Replace `<s3-bucket-name>` with your actual S3 bucket name and `<region>` with your AWS region (e.g. `us-east-1`).
   5. Click ✔ to save each mapping.

---

### 4.5 Deploy the API

1. Click **Actions** → **Deploy API**.
2. **Deployment stage**: select **[New Stage]**, name it `prod`.
3. Click **Deploy**.
4. Note the **Invoke URL** at the top, e.g.:
    ```
    https://<api-id>.execute-api.<region>.amazonaws.com/prod
    ```


---

## 5. Set Up API Gateway Trigger in AWS Lambda

1. In the Lambda designer, click **+ Add trigger**.
2. Select source as **API Gateway**.
3. Choose **Use existing API**.
4. Select your Comment API that you created **CommentsAPI**.
5. Select deployment stage as **prod**.
6. Create the trigger and click **Add**.
7. Click **Deploy** to deploy your API.