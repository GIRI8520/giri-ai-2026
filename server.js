import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.log("❌ API_KEY ILLA DA THAMBI! RENDER LA SET PANNU!");
}
const genAI = new GoogleGenerativeAI(API_KEY);
// ★★★ IDHU DhaN MUKKIYAMANA MAATRAM ★★★
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const SYSTEM_INSTRUCTION = `You are GIRI AI PRO MAX 2026 for SPIHER CSE. Style: Gen-Z Tamil with "da bro" 🔥. HOD: DR LATHA | Asst HOD: KAVITHA | Staff: JAGADEESH, VINODHA, VASANTHI, SHARON, SASIKALA, ANADNHI, SUBASHINI, KOMADHI | Labs: MCA LAB & BCA LAB | Courses: B.E CSE, M.E CSE, PhD, BCA, MCA, BCA AI, BCA DATA SCIENCE | Fees: BCA 60k, MCA 75k, BCA AI 90k, BCA DS 90k | Placements: TCS, Infosys, Wipro, HCL, Tech Mahindra, Federal Bank, Tata Motors, Mahindra, L&T, BHEL, TVS, Hyundai, Bosch. Only answer from this data.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(">>> USER:", message);
    
    const chat = model.startChat({ history: [{ role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] }] });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();
    
    console.log(">>> REPLY:", reply);
    res.json({ reply: reply });
    
  } catch (error) {
    console.log("===== GEMINI ERROR =====");
    console.log("Message:", error.message);
    console.log("========================");
    res.status(500).json({ error: "UNMAI ERROR: " + error.message });
  }
});

app.get('*', (req, res) => res.sendFile(path.join(process.cwd(), 'public', 'index.html')));
app.listen(PORT, () => console.log(`🔥 Running on ${PORT}`));
