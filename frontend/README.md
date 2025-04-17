# 🌐 Frontend – AWS Comment System

This folder contains the static website files (HTML, CSS, JavaScript) for the serverless comment system. These files are hosted via **Amazon S3** with public read access and integrated with **API Gateway + Lambda** to make the website dynamic.

---

## 📦 Files

| File        | Purpose                                          |
|-------------|--------------------------------------------------|
| `index.html`| Main HTML page with comment form and section     |
| `styles.css`| UI styling for the form and comments section     |
| `script.js` | Contains logic for sending/fetching/deleting comments using API Gateway |

---

## 🚀 Steps to Deploy Frontend on Amazon S3

1. Go to the [Amazon S3 Console](https://console.aws.amazon.com/s3/).
2. Click **Create bucket** (use a globally unique name).
    - Bucket name: `<your-bucket-name>` (e.g., `my-comment-system-frontend`)
    - Region: Select your preferred region (e.g., `us-east-1`)
    - Block Public Access settings for this bucket: **Uncheck** all options.
      - **Note:** You can also set up a bucket policy to allow public access to the files in the bucket.
4. Click **Create bucket**.
5. Go to the **Permissions** tab and set the following **Bucket Policy** and **CORS configuration**:

   ```json
   // Bucket Policy to allow public access to the bucket
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::<your-bucket-name>/*"
       }
     ]
   }

   // Add this CORS configuration to Cross-origin resource sharing (CORS) to allow cross-origin requests
   [
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
   ]
    
6. Upload the following files:
    - index.html
    - styles.css
    - script.js
7. Set the **index.html** as the default document for static website hosting.
   - Go to the **Properties** tab of your bucket.
   - Scroll down to **Static website hosting** and click on it.
   - Under **Index document**, enter `index.html`.
   - Under **Error document**, you can also enter `index.html` (optional).
8. Click **Save**.
9. Access your website using the **Endpoint** URL provided in the Static Website Hosting section.



## 🔗 Connect Frontend to API Gateway

Do this step after deploying the backend (API Gateway + Lambda).
1. Open the `script.js` file in the `frontend` folder.
2. Find the line where the API Gateway URL is defined. It should look like this:

   ```javascript
   const apiUrl = "https://<your-api-id>.execute-api.<region>.amazonaws.com/<stage>/comments";
   ```
3. Replace `<your-api-id>`, `<region>`, and `<stage>` with the actual values from your API Gateway deployment.
    - `<your-api-id>`: The ID of your API Gateway. You can find this in the API Gateway console under your API's settings.
    - `<region>`: The AWS region where your API is deployed (e.g., `us-east-1`).
    - `<stage>`: The stage name you used when deploying the API (e.g., `prod` or `dev`).
4. Save the changes to `script.js`.
5. Upload the updated `script.js` file to your S3 bucket, replacing the old version.
6. Refresh your website in the browser to see the changes.
7. Test the comment system by submitting, fetching, and deleting comments.
8. If everything works, congratulations! You have successfully deployed the frontend of the AWS Comment System.
9. If you encounter any issues, check the browser console for errors and ensure that the API Gateway is correctly configured to allow CORS requests from your S3 bucket.

---
## 📣 Accessing Your Live Site
Once deployed, your site is publicly available at: ` http://<your-bucket-name>.s3-website-<region>.amazonaws.com `
- Example: `http://my-comment-system-frontend.s3-website-us-east-1.amazonaws.com`