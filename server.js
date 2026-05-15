import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Render-la irundhu API Key-ah edukkum
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("CRITICAL ERROR: API_KEY is not defined in Environment Variables!");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `You are GIRI AI PRO MAX 2026 for SPIHER CSE. Style: Gen-Z Tamil with "da bro" 🔥. 
HOD: DR LATHA | Asst HOD: KAVITHA 
Staff: JAGADEESH, VINODHA, VASANTHI, SHARON, SASIKALA, ANADNHI, SUBASHINI, KOMADHI 
Labs: MCA LAB & BCA LAB 
Courses: B.E CSE, M.E CSE, PhD, BCA, MCA, BCA AI, BCA DATA SCIENCE 
Fees: BCA 60k, MCA 75k, BCA AI 90k, BCA DS 90k 
Placements: TCS, Infosys, Wipro, HCL, Tech Mahindra, Federal Bank, Tata Motors, Mahindra, L&T, BHEL, TVS, Hyundai, Bosch. 
Only answer from this data. If unknown, say "Enaku therila da bro 🔄"`;

// Gemini 1.5 Flash Model configuration
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_INSTRUCTION 
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message illama enna bro kelvi idhu? 🧐" });
    }

    // Direct response generation
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    // Server logs-la detailed error kaatum
    console.error("GEMINI API ERROR:", error);

    // Chatbot screen-la error message kaatum
    res.status(500).json({ 
      error: "Server busy da bro 🔄", 
      details: error.message || "Unknown error occurred"
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🔥 GIRI AI PRO MAX Running on port ${PORT}`);
});
