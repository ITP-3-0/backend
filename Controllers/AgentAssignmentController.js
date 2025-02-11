const AgentAssignment = require("../Models/AgentAssignmentModel");
const User = require("../Models/UserModel");

// Create or update agent assignment
const createAssignment = async (req, res) => {
    try {
        const { clientPattern, l1AgentId, l2AgentId } = req.body;

        // Validate agents exist and have correct roles
        const l1Agent = await User.findOne({ _id: l1AgentId, role: 'agent_l1' });
        const l2Agent = await User.findOne({ _id: l2AgentId, role: 'agent_l2' });

        if (!l1Agent || !l2Agent) {
            return res.status(400).json({ 
                message: "Invalid agent IDs or roles" 
            });
        }

        // Create or update assignment
        const assignment = await AgentAssignment.findOneAndUpdate(
            { clientPattern },
            {
                l1Agent: l1AgentId,
                l2Agent: l2AgentId,
                updatedAt: Date.now()
            },
            { new: true, upsert: true }
        );

        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get agent assignment for a client username
const getAssignmentForClient = async (username) => {
    try {
        const assignments = await AgentAssignment.find({ isActive: true });
        
        // Find matching pattern
        const assignment = assignments.find(a => {
            if (a.clientPattern.includes(',')) {
                // Direct username list
                const usernames = a.clientPattern.split(',');
                return usernames.includes(username);
            } else if (a.clientPattern.includes('-')) {
                // Range pattern (e.g., "001-099")
                const [start, end] = a.clientPattern.split('-');
                return username >= start && username <= end;
            } else {
                // Pattern matching (e.g., "1XX" where X is any digit)
                const pattern = new RegExp('^' + a.clientPattern.replace(/X/g, '\\d') + '$');
                return pattern.test(username);
            }
        });

        return assignment;
    } catch (error) {
        console.error('Error finding agent assignment:', error);
        return null;
    }
};

// Get all assignments
const getAllAssignments = async (req, res) => {
    try {
        const assignments = await AgentAssignment.find()
            .populate('l1Agent', 'name username')
            .populate('l2Agent', 'name username');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete assignment
const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        await AgentAssignment.findByIdAndDelete(id);
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAssignment,
    getAssignmentForClient,
    getAllAssignments,
    deleteAssignment
}; 