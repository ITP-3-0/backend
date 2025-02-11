const express = require("express");
const router = express.Router();
const AgentAssignmentController = require("../Controllers/AgentAssignmentController");
const { authenticate, authorize } = require("../middleware/auth");

// Admin only routes
router.post("/", 
    authenticate, 
    authorize(['admin']), 
    AgentAssignmentController.createAssignment
);

router.get("/", 
    authenticate, 
    authorize(['admin']), 
    AgentAssignmentController.getAllAssignments
);

router.delete("/:id", 
    authenticate, 
    authorize(['admin']), 
    AgentAssignmentController.deleteAssignment
);

module.exports = router; 