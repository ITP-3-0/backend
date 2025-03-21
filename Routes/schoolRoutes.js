const express = require('express');
const router = express.Router();
const School = require('../models/schoolModel');

// Create a new school
router.post('/', async (req, res) => {
    try {
        const school = new School(req.body);
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all schools
router.get('/', async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single school by Census No
router.get('/:schoolCensusNo', async (req, res) => {
    try {
        const school = await School.findOne({ schoolCensusNo: req.params.schoolCensusNo });
        if (!school) return res.status(404).json({ error: 'School not found' });
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a school
router.put('/:schoolCensusNo', async (req, res) => {
    try {
        const school = await School.findOneAndUpdate(
            { schoolCensusNo: req.params.schoolCensusNo },
            req.body,
            { new: true }
        );
        if (!school) return res.status(404).json({ error: 'School not found' });
        res.status(200).json(school);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a school
router.delete('/:schoolCensusNo', async (req, res) => {
    try {
        const school = await School.findOneAndDelete({ schoolCensusNo: req.params.schoolCensusNo });
        if (!school) return res.status(404).json({ error: 'School not found' });
        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
