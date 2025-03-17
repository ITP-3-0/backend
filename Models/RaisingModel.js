const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define enums (mirroring the Priority and Status enums from types/enums)
const PriorityEnum = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

const StatusEnum = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed'
};

// Document Schema (based on DocumentDto)
const DocumentSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
});

// Main Raising Schema
const RaisingSchema = new Schema({
  ticket_id: {
    type: String,
    unique: true,
    default: function() {
      return `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    }
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  creator: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: Object.values(PriorityEnum),
    required: true
  },
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.OPEN
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  responses: [{
    type: String
  }],
  documents: [DocumentSchema]
});

// Export the model
module.exports = mongoose.model(
    'RaisingModel', 
    RaisingSchema
);