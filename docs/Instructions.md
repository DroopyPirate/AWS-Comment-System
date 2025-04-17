# 📋 Instructions

This file walks you through the very first steps—creating your AWS account and budget—and then points you at the correct `README.md` files and AWS services to set up in order. Follow it top‑to‑bottom.

---

## 1️⃣ Step 1: Create an AWS Account

1. Open https://aws.amazon.com/
2. Click **Create an AWS Account** and follow the on‑screen prompts.
3. Verify your email, add payment info, and sign in to the AWS Management Console.

---

## 2️⃣ Step 2: Create a “Zero‑Dollar” Budget

> We’ll create a budget with $0 so you can immediately edit it to \$0.01 and get alerts.

1. In the AWS Console header, choose **Billing & Cost Management**.
2. On the left, click **Budgets** → **Create budget**.
3. Select **Cost budget** → **Next**.
4. Enter:
   - **Budget name**: `Zero Dollar Budget`
   - **Period**: Monthly
   - **Budgeted amount**: `0`  
5. Click **Next**, skip alerts for now, and finish **Create budget**.

---

## 3️⃣ Step 3: Edit Your Budget to \$0.01

1. In **Billing & Cost Management** → **Budgets**, click your `Zero Dollar Budget`.
2. Click **Edit budget**.
3. Change **Budgeted amount** to `0.01`.
4. Under **Alerts**, add:
   - **Threshold**: `100%`
   - **Email recipients**: your email address  
5. Save your changes.

> You will now receive an email if your AWS spend reaches \$0.01. Services will continue running—you just get alerted.

---

## 🔀 What to Read & Configure Next

Follow these folders/READMEs in order, and configure the matching AWS service as you go:

1. **frontend/README.md**  
   - Folder: `./frontend/README.md`  
   - Configures: **S3 static website**, CORS, and wiring your `script.js` to the API endpoint.

2. **backend/README.md**  
   - Folder: `./backend/README.md`  
   - Configures: **DynamoDB**, **Lambda**, **API Gateway** in sequence.

3. **README.md** (root)  
   - File: `./README.md`  
   - Overview of the entire project, tech stack, and links to all sub‑folders.

---

## 📂 Folder & File Locations

```text
aws-comment-system/
│
├── README.md                      ← Root overview
│
├── docs/
│   └── Instructions.md            ← Account and Budget Setup, steps to follow in order. (You are here)
│
├── backend/
│   ├── README.md                  ← DynamoDB + Lambda + API Gateway instructions
│   └── lambda_function.py         ← Python handler for /comments
│
└── frontend/
    ├── README.md                  ← S3 & frontend instructions
    ├── index.html                 ← Static HTML
    ├── styles.css                 ← CSS styling
    └── script.js                  ← JS: calls your API Gateway endpoint
