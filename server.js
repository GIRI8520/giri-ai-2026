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

// Inga dhaan path fix panni irukaen
app.use(express.static(path.join(__dirname, 'public')));

// Render-la irundhu key edukkum
const API_KEY = process.env.API_KEY; 

if (!API_KEY) {
  console.log("Error: API_KEY is missing in Render Environment!");
}

const genAI = new GoogleGenerativeAI(API_KEY);
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
    // Instruction and message combined
    const result = await model.generateContent(`${SYSTEM_INSTRUCTION}\n\nUser: ${message}`);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "Server busy da bro 🔄", details: error.message });
  }
});

// "Cannot GET /" solution:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🔥 Server running on ${PORT}`));
