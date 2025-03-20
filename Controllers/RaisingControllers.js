const Ticket = require("../Models/RaisingModel");

// Get All Tickets
const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find();

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({
                message: "No tickets found",
            });
        }

        return res.status(200).json({ tickets });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error retrieving tickets",
            error: err.message,
        });
    }
};

// Add New Ticket
const addTicket = async (req, res, next) => {
    const { title, description, deviceName, distributionDate, warrantyPeriod, agentName, priority, creator } = req.body;

    try {
        console.log("Creating ticket with data:", req.body);

        // Define created_at field
        const created_at = new Date();

        const ticket = new Ticket({
            title,
            description,
            creator,
            priority,
            created_at,
            deviceName,
            distributionDate,
            warrantyPeriod,
            agentName,
        });

        const savedTicket = await ticket.save();

        return res.status(201).json({
            message: "Ticket created successfully",
            ticket: savedTicket,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error creating ticket",
            error: err.message,
        });
    }
};

// Get Ticket by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found",
            });
        }

        return res.status(200).json({ ticket });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error retrieving ticket",
            error: err.message,
        });
    }
};

// Update Ticket
const updateTicket = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, priority, status, responses, documents } = req.body;

    try {
        const updateData = {};

        // Only include fields that were provided in the request
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (priority) updateData.priority = priority;
        if (status) updateData.status = status;
        if (responses) updateData.responses = responses;
        if (documents) updateData.documents = documents;

        const ticket = await Ticket.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found",
            });
        }

        return res.status(200).json({
            message: "Ticket updated successfully",
            ticket,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error updating ticket",
            error: err.message,
        });
    }
};

// Delete Ticket
const deleteTicket = async (req, res, next) => {
    const id = req.params.id;

    try {
        const ticket = await Ticket.findByIdAndDelete(id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found",
            });
        }

        return res.status(200).json({
            message: "Ticket deleted successfully",
            ticket,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error deleting ticket",
            error: err.message,
        });
    }
};

// Exports
exports.getAllTickets = getAllTickets;
exports.addTicket = addTicket;
exports.getById = getById;
exports.updateTicket = updateTicket;
exports.deleteTicket = deleteTicket;
