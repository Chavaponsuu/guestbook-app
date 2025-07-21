const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err.message);
  });

console.log("🔎 MONGO_URI is:", process.env.MONGO_URI);


const MessageSchema = new mongoose.Schema({
  name: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", MessageSchema);

// Routes
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error("❌ GET Error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});


app.post("/messages", async (req, res) => {
  console.log("📨 Received:", req.body); // เช็กว่า Postman ส่งอะไรมาบ้าง

  const { name, message } = req.body;

  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("❌ Save Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
