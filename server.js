import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// STATIC FILES FIX: Inga dhaan 'Cannot GET /' fix aagum
app.use(express.static(path.join(__dirname, 'public')));

// API_KEY edukkum podhu error vandha console-la kaatum
const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_INSTRUCTION = `You are GIRI AI PRO MAX 2026 for SPIHER CSE. Style: Gen-Z Tamil with "da bro" 🔥. 
HOD: DR LATHA | Asst HOD: KAVITHA 
Staff: JAGADEESH, VINODHA, VASANTHI, SHARON, SASIKALA, ANADNHI, SUBASHINI, KOMADHI 
Labs: MCA LAB & BCA LAB 
Courses: B.E CSE, M.E CSE, PhD, BCA, MCA, BCA AI, BCA DATA SCIENCE 
Fees: BCA 60k, MCA 75k, BCA AI 90k, BCA DS 90k 
Placements: TCS, Infosys, Wipro, HCL, Tech Mahindra, Federal Bank, Tata Motors, Mahindra, L&T, BHEL, TVS, Hyundai, Bosch. 
Only answer from this data. If unknown, say "Enaku therila da bro 🔄"`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!API_KEY) {
      throw new Error("Render-la API_KEY set panna marandhutinga bro!");
    }

    const result = await model.generateContent(`${SYSTEM_INSTRUCTION}\n\nUser: ${message}`);
    const text = result.response.text();
    res.json({ reply: text });

  } catch (error) {
    console.error("LOGS ERROR:", error.message);
    res.status(500).json({ 
      error: "Server busy da bro 🔄", 
      details: error.message 
    });
  }
});

// Root path-la index.html-ah load panna:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🔥 GIRI AI PRO MAX Running on ${PORT}`));
