import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Render-la irukura API_KEY-ah edukkum
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_INSTRUCTION = `You are GIRI AI PRO MAX 2026 for SPIHER CSE.
HOD: DR LATHA | Asst HOD: KAVITHA 
Staff: JAGADEESH, VINODHA, VASANTHI, SHARON, SASIKALA, ANADNHI, SUBASHINI, KOMADHI 
Fees: BCA 60k, MCA 75k, BCA AI 90k, BCA DS 90k 
Style: Gen-Z Tamil "da bro". Only answer from this data.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const prompt = `${SYSTEM_INSTRUCTION}\n\nUser: ${message}`;
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Server busy da bro 🔄", details: error.message });
  }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(process.env.PORT || 3000, () => console.log("🔥 AI Started!"));
