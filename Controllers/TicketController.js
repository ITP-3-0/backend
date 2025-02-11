const Ticket = require("../Models/TicketModel");
const User = require("../Models/UserModel");
const { getAssignmentForClient } = require("./AgentAssignmentController");
const sendEmail = require("../utils/emailService");

// Modified createTicket function
const createTicket = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        const creator = await User.findById(req.user.id);

        // Get agent assignment for the ticket creator
        const assignment = await getAssignmentForClient(creator.username);
        if (!assignment) {
            return res.status(400).json({ 
                message: "No agent assigned for this user pattern" 
            });
        }

        const ticket = new Ticket({
            title,
            description,
            category,
            priority,
            createdBy: req.user.id,
            assignedTo: assignment.l1Agent // Automatically assign to L1 agent
        });

        await ticket.save();

        // Notify assigned L1 agent
        const l1Agent = await User.findById(assignment.l1Agent);
        l1Agent.notifications.push({
            message: `New ticket assigned: ${title}`
        });
        await l1Agent.save();
        sendEmail(l1Agent.email, 'New Ticket Assigned', 
            `A new ticket has been assigned to you: ${title}`);

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add response to ticket
const addResponse = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { message } = req.body;
        
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        ticket.responses.push({
            responder: req.user.id,
            message
        });
        ticket.updatedAt = Date.now();
        await ticket.save();

        // Notify ticket creator
        const creator = await User.findById(ticket.createdBy);
        creator.notifications.push({
            message: `New response on ticket: ${ticket.title}`
        });
        await creator.save();
        sendEmail(creator.email, 'New Response to Your Ticket', 
            `A new response has been added to your ticket: ${ticket.title}`);

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modified escalateTicket function
const escalateTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { escalationReason } = req.body;
        
        const ticket = await Ticket.findById(ticketId)
            .populate('createdBy', 'username');
        
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Get agent assignment for the ticket creator
        const assignment = await getAssignmentForClient(ticket.createdBy.username);
        if (!assignment) {
            return res.status(400).json({ 
                message: "No L2 agent assignment found" 
            });
        }

        // Update ticket
        ticket.status = 'escalated';
        ticket.assignedTo = assignment.l2Agent;
        ticket.responses.push({
            responder: req.user.id,
            message: `Ticket escalated to L2. Reason: ${escalationReason}`
        });
        await ticket.save();

        // Notify L2 agent
        const l2Agent = await User.findById(assignment.l2Agent);
        l2Agent.notifications.push({
            message: `Ticket escalated to you: ${ticket.title}`
        });
        await l2Agent.save();
        sendEmail(l2Agent.email, 'Ticket Escalated', 
            `A ticket has been escalated to you: ${ticket.title}`);

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modified getTickets function
const getTickets = async (req, res) => {
    try {
        const { status, priority, category } = req.query;
        const filter = {};
        
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (category) filter.category = category;

        // If user is client, only show their tickets
        if (req.user.role === 'client') {
            filter.createdBy = req.user.id;
        } 
        // If user is L1 or L2 agent, only show assigned tickets
        else if (['agent_l1', 'agent_l2'].includes(req.user.role)) {
            filter.assignedTo = req.user.id;
        }

        const tickets = await Ticket.find(filter)
            .populate('createdBy', 'name username')
            .populate('assignedTo', 'name username')
            .populate('responses.responder', 'name username');

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTicket,
    addResponse,
    escalateTicket,
    getTickets
}; 