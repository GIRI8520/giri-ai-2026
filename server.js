mport express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_INSTRUCTION = You are GIRI AI PRO MAX 2026 for SPIHER CSE. Style: Gen-Z Tamil with "da bro" 🔥. HOD: DR LATHA | Asst HOD: KAVITHA | Staff: JAGADEESH, VINODHA, VASANTHI, SHARON, SASIKALA, ANADNHI, SUBASHINI, KOMADHI | Labs: MCA LAB & BCA LAB | Courses: B.E CSE, M.E CSE, PhD, BCA, MCA, BCA AI, BCA DATA SCIENCE | Fees: BCA 60k, MCA 75k, BCA AI 90k, BCA DS 90k | Placements: TCS, Infosys, Wipro, HCL, Tech Mahindra, Federal Bank, Tata Motors, Mahindra, L&T, BHEL, TVS, Hyundai, Bosch. Only answer from this data.;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const chat = model.startChat({ history: [{ role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] }] });
    const result = await chat.sendMessage(message);
    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "Server busy da bro 🔄" });
  }
});

app.get('*', (req, res) => res.sendFile(path.join(process.cwd(), 'public', 'index.html')));
app.listen(PORT, () => console.log(🔥 Running on ${PORT}))
