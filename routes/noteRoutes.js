const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes" });
    }
});

// Create a new note
router.post("/", async (req, res) => {
    const { title, content } = req.body;
    try {
        console.log(title)
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: "Error saving note" });
    }
});

// Update a note
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, color, pinned } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content, color, pinned },
            { new: true }
        );
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: "Error updating note" });
    }
});

// Delete a note
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Note.findByIdAndDelete(id);
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting note" });
    }
});

module.exports = router;
