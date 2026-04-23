# 🛡️ TrustGuard AI: Real-Time Resume Analyzer

TrustGuard AI is a sophisticated, real-time resume analysis system designed to empower job seekers and freelancers. By leveraging advanced AI models (via Groq), it parses resumes, identifies skill gaps, and generates actionable career roadmaps to help users bridge the gap between their current profile and their dream roles.

![TrustGuard AI Banner](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200&h=400)

## 🚀 Key Features

- **📄 Real-Time PDF Parsing**: Upload your resume in PDF format and watch as the AI extracts and analyzes your experience instantly.
- **🧠 AI-Driven Skill Gap Analysis**: Identifies exactly what skills you're missing for your target roles.
- **🗺️ Dynamic Roadmap Generation**: Creates a step-by-step learning path to help you gain required skills.
- **💬 Live Thinking Log**: A unique terminal-style interface that shows you the AI's "thought process" as it analyzes your data.
- **📊 Interactive Dashboard**: Visualizes your progress and provides detailed recommendations for career growth.
- **✨ Premium UI/UX**: Built with a sleek, modern aesthetic using Shadcn UI and custom animations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI)
- **Icons**: Lucide React
- **Animations**: Tailwind Animate / CSS Transitions
- **State Management**: TanStack Query (React Query)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: Groq API (OpenAI Compatible)
- **File Handling**: Multer (for PDF uploads)
- **Parsing**: PDF-parse

## 📂 Project Structure

```text
├── server/                 # Express Backend
│   ├── .env                # Backend Environment Variables
│   ├── index.js            # Main Server File
│   └── package.json        # Backend Dependencies
├── src/                    # React Frontend
│   ├── components/         # Reusable UI Components
│   │   └── trustguard/     # Core Business Logic Components
│   ├── pages/              # Application Pages
│   ├── hooks/              # Custom React Hooks
│   ├── lib/                # Utility Functions
│   └── App.tsx             # Main App Component
├── public/                 # Static Assets
└── package.json            # Frontend Dependencies
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (local or Atlas)
- Groq Cloud API Key

### 1. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Navigate back to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📝 License

This project is licensed under the ISC License.

---

Built with ❤️ for better career paths.
