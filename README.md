# 🧠 MindSpace - Mental Health Consultation Platform

**MindSpace** is a modern mental health platform connecting users with professional psychologists. Built with the latest web technologies, this application features real-time consultation, schedule management, and **AI Chatbot (MindBot)** as an intelligent emotional companion.

## 🎥 Video Demo

Watch a quick demonstration of MindSpace in action, featuring the AI Chatbot and Consultation Booking flow.

[![MindSpace Demo Video](public/img/banner-placeholder.png)](https://youtu.be/BNhqBP2cBvI)

> *Click the image above to watch the walkthrough on YouTube.*

---

## 🚀 Tech Stack

This project is built using *High-Performance* and *Scalable* technologies:

* **Core Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** [Neon PostgreSQL](https://neon.tech/) (Serverless)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **AI Integration:** [Google Gemini API](https://ai.google.dev/) (MindBot)
* **Payment Gateway:** [Midtrans](https://midtrans.com/)
* **Email Service:** [Brevo](https://www.brevo.com/) (SMTP & API)

## ✨ Key Features

### 🤖 MindBot (AI Companion)
* Intelligent chatbot powered by **Google Gemini AI**.
* Provides empathetic responses for initial emotional support.
* Integrated with the database to recommend psychologists based on user complaints.
* Automatically checks user consultation schedules.

### 📅 Consultation & Booking System
* Psychologist search based on specialization.
* Flexible consultation schedule booking.
* Automatic payment integration via **Midtrans**.

### 📧 Email Notifications (Brevo)
* Automatic confirmation emails upon successful payment.
* Secure password reset emails.
* "Contact Us" form directly connected to the Admin.

### 📊 Admin Dashboard
* Data visualization of user growth and consultation statistics.
* Mental health article management.
* Psychologist verification and user management.

## 🛠️ Installation & Setup

Follow these steps to run the project locally on your machine:

### 1. Clone Repository
```bash
git clone https://github.com/azizhadiid/my-mindspace-app.git
cd mindspace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variable Configuration
```bash
# Database (Neon Postgres)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_next_auth_secret"
JWT_SECRET="your_super_secure_secret"

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# Brevo (Email Service) - Use API Key (starts with xkeysib-...)
BREVO_API_KEY="xkeysib-xxxxxxxxxxxx"
BREVO_SENDER_EMAIL="admin@mindspace.com"
BREVO_SENDER_NAME="MindSpace Admin"

# Midtrans (Payment)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your_midtrans_client_key"
MIDTRANS_SERVER_KEY="your_midtrans_server_key"
MIDTRANS_MERCHANT_ID="your_midtrans_merchant_id"
```

### 4. Database Setup (Prisma)
```bash
npx prisma generate
npx prisma db push
```
 ### 5. Run Development Server
 ```bash
npm run dev
```

### 🤝 Contribution
Contributions are always welcome! Please feel free to create a Pull Request or report Issues if you find any bugs.