const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
// app.use(cors());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

mongoose.connect("mongodb+srv://patilharshada2122:hp08@cluster0.lnvz54d.mongodb.net/Playflix?retryWrites=true&w=majority&appName=Cluster0");


const db = mongoose.connection;
db.once("open", () => console.log("✅ MongoDB connected"));
const SignupSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  language: String,
  plan: String,
});

const User = mongoose.model("User", SignupSchema);

app.get("/", (req, res) => {
  res.send("🚀 Backend is live and running!");
});

// 👇 Signup route
app.post("/signup", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.listen(3000, () => console.log("🚀 Server running"));
