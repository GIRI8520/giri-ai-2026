import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Key name "API_KEY" nu Render-la irukanum
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
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
    // System instruction and user message combination
    const result = await model.generateContent(`${SYSTEM_INSTRUCTION}\n\nUser: ${message}`);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (error) {
    // Indha console error Render logs-la real reason-ai kaattum
    console.error("REAL ERROR:", error);
    res.status(500).json({ error: "Server busy da bro 🔄", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
