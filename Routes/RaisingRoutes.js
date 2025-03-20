const express = require('express');
const ticketRouter = express.Router();

// Insert Model
const Ticket = require('../Models/RaisingModel');

// Insert Ticket Controller
const TicketController = require('../Controllers/RaisingControllers');

ticketRouter.get('/', TicketController.getAllTickets);
ticketRouter.post('/', TicketController.addTicket);
ticketRouter.get('/:id', TicketController.getById);
ticketRouter.put('/:id', TicketController.updateTicket);
ticketRouter.delete('/:id', TicketController.deleteTicket);

// Export
module.exports = ticketRouter;