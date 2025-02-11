const express = require("express");
const router = express.Router();
const TicketController = require("../Controllers/TicketController");
const { authenticate, authorize } = require("../middleware/auth");

// Ticket routes
router.post("/", authenticate, TicketController.createTicket);
router.get("/", authenticate, TicketController.getTickets);
router.post("/:ticketId/respond", authenticate, TicketController.addResponse);
router.post("/:ticketId/escalate", 
    authenticate, 
    authorize(['agent_l1', 'admin']), 
    TicketController.escalateTicket
);

module.exports = router; 