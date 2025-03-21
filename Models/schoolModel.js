const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    schoolCensusNo: { type: String, required: true},
    schoolName: { type: String, required: true },
    schoolAddress: { type: String, required: true },
    zone: { type: String, required: true },
    province: { type: String, required: true },
    administrativeDistrict: { type: String, required: true }
});

module.exports = mongoose.model('School', schoolSchema);
