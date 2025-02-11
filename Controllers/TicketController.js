const Ticket = require("../Models/TicketModel");
const User = require("../Models/UserModel");
const sendEmail = require("../utils/emailService");

// Create a new ticket
const createTicket = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        const ticket = new Ticket({
            title,
            description,
            category,
            priority,
            createdBy: req.user.id // Assuming you have authentication middleware
        });

        await ticket.save();

        // Notify L1 agents
        const l1Agents = await User.find({ role: 'agent_l1' });
        l1Agents.forEach(agent => {
            agent.notifications.push({
                message: `New ticket created: ${title}`
            });
            agent.save();
            sendEmail(agent.email, 'New Ticket Created', `A new ticket has been created: ${title}`);
        });

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

// Escalate ticket
const escalateTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket.findById(ticketId);
        
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        ticket.status = 'escalated';
        await ticket.save();

        // Notify L2 agents
        const l2Agents = await User.find({ role: 'agent_l2' });
        l2Agents.forEach(agent => {
            agent.notifications.push({
                message: `Ticket escalated: ${ticket.title}`
            });
            agent.save();
            sendEmail(agent.email, 'Ticket Escalated', 
                `A ticket has been escalated: ${ticket.title}`);
        });

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tickets (with filtering)
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

        const tickets = await Ticket.find(filter)
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email')
            .populate('responses.responder', 'name email');

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