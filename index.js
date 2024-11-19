const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Note Schema
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
});

const Note = mongoose.model("Note", noteSchema);

// Routes
app.post("/api/notes", async (req, res) => {
    try {
        const { title, note } = req.body;
        const newNote = new Note({ title, note });
        await newNote.save();
        res.status(201).json({ message: "Note saved successfully" });
    } catch (err) {
        console.error("Error saving note:", err);
        res.status(500).json({ message: "Failed to save note" });
    }
});

app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).json({ message: "Failed to fetch notes" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
