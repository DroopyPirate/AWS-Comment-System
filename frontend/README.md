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