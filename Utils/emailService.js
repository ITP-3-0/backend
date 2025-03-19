const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

const sendEmail = async (to, subject, text, templateData) => {
    if (!to) {
        console.error("❌ No recipients defined.");
        return;
    }

    // Read the HTML template
    const templatePath = path.join(__dirname, "emailTemplate.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Debug: Log template data
    console.log("Template Data:", templateData);

    // Replace placeholders with actual data
    html = html
        .replace("{{title}}", templateData.title || "No Title")
        .replace("{{message}}", templateData.message || "No Message")
        .replace("{{priority}}", templateData.priority || "low");

    const mailOptions = {
        from: '"Notification System" <no-reply@example.com>',
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${to}`);
    } catch (err) {
        console.error("❌ Error sending email:", err.message);
        throw err;
    }
};

const addNotification = async (req, res, next) => {
    const { title, message, type, isEmailable, priority, targetUsers, targetRoles } = req.body;
    let notification;

    try {
        // Create a new notification
        notification = new Notification({
            title,
            message,
            type,
            isEmailable,
            priority,
            targetUsers, // Store usernames directly
            targetRoles,
        });
        await notification.save();

        // Send email alerts if `isEmailable` is true
        if (isEmailable) {
            let recipients = [];

            // Fetch email addresses of target users
            if (targetUsers && targetUsers.length > 0) {
                const users = await User.find({ username: { $in: targetUsers } });
                console.log("Fetched Users:", users);
                recipients = users.map((user) => user.email); // Fetch email field
            }

            // Fetch email addresses of users with target roles
            if (targetRoles && targetRoles.length > 0) {
                const users = await User.find({ role: { $in: targetRoles } });
                recipients = [...recipients, ...users.map((user) => user.email)];
            }

            recipients = [...new Set(recipients)];

            // Check if recipients array is empty
            if (recipients.length === 0) {
                console.log("No recipients found for the notification.");
                return res.status(400).json({ message: "No recipients found for the notification." });
            }

            // Send emails to all recipients
            const emailSubject = `New Notification: ${title}`;
            const emailMessage = `You have a new notification:\n\n${message}`;
            const templateData = { title, message, priority };
            for (const recipient of recipients) {
                try {
                    await sendEmail(recipient, emailSubject, emailMessage, templateData);
                } catch (emailError) {
                    console.error(`❌ Error sending email to ${recipient}:`, emailError.message);
                }
            }
        }
    } catch (err) {
        console.error("❌ Error creating notification:", err.message);
        return res.status(500).json({ message: "Error creating notification", error: err.message });
    }

    if (!notification) {
        return res.status(404).json({ message: "Unable to add notification" });
    }

    return res.status(200).json(notification);
};

module.exports = { sendEmail, addNotification };
