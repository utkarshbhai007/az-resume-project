import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { createRequire } from 'module';
import { PDFParse } from 'pdf-parse';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Single User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, default: 'Current User' },
  skills: [String],
  experienceLevel: String,
  interests: [String],
  resume: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  analysis: {
    extractedSkills: [String],
    domain: String,
    experienceYears: Number,
    strengthScore: Number,
    summary: String,
    highlights: [String],
  },
  lastUpdated: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Groq client setup
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Helper to get/create the single user
const getOrCreateUser = async () => {
  let user = await User.findOne();
  if (!user) {
    user = new User();
    await user.save();
  }
  return user;
};

// API Endpoints

app.get('/api/user-profile', async (req, res) => {
  try {
    const user = await getOrCreateUser();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await getOrCreateUser();
    
    // Extract text from PDF
    const dataBuffer = req.file.buffer;
    const parser = new PDFParse({ data: dataBuffer });
    const data = await parser.getText();
    const resumeText = data.text;

    // Call Groq AI for analysis
    const prompt = `
      Analyze the following resume text and provide a structured JSON response.
      The JSON must follow this format exactly:
      {
        "extractedSkills": ["Skill 1", "Skill 2"],
        "domain": "Primary Professional Domain",
        "experienceYears": number,
        "strengthScore": 0-100,
        "summary": "Brief professional summary",
        "highlights": ["Notable achievement 1", "Notable achievement 2"]
      }

      Resume Text:
      ${resumeText}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);

    // Save to DB
    user.resume = {
      data: dataBuffer,
      contentType: req.file.mimetype,
      fileName: req.file.originalname
    };
    user.analysis = analysis;
    user.lastUpdated = new Date();
    await user.save();

    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/save-profile', async (req, res) => {
  try {
    const { skills, experienceLevel, interests } = req.body;
    const user = await getOrCreateUser();
    
    user.skills = skills;
    user.experienceLevel = experienceLevel;
    user.interests = interests;
    user.lastUpdated = new Date();
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { missingSkills } = req.body;
    if (!missingSkills || missingSkills.length === 0) {
      return res.status(400).json({ error: 'No missing skills provided' });
    }

    const prompt = `
      Create a detailed, beginner-friendly learning roadmap for the following skills: ${missingSkills.join(', ')}.
      The goal is to help a freelancer become market-ready for top platforms like Upwork and Toptal.
      Return the response as a structured JSON object with this format:
      {
        "title": "Learning Roadmap",
        "description": "Short overview",
        "steps": [
          {
            "id": 1,
            "title": "Step title",
            "content": "What to learn precisely",
            "estimatedTime": "1-2 weeks",
            "resources": ["Resource Name 1", "Resource Name 2"]
          }
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(completion.choices[0].message.content));
  } catch (error) {
    console.error('Roadmap error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
