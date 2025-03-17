const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json()); // Parse incoming JSON payloads

// Webhook route
app.post("/github-webhook", (req, res) => {
    const branch = req.body.ref; // Get branch name
    if (branch === "refs/heads/master") {
        console.log("🔄 Change detected on master branch. Pulling latest changes...");

        // Run git pull, install dependencies, and restart the app
        exec("git pull origin master && npm install && pm2 restart backend-app", (err, stdout, stderr) => {
            if (err) {
                console.error(`❌ Error: ${err.message}`);
                return res.status(500).send("Error updating.");
            }
            console.log(`✅ Git Pull Output: ${stdout}`);
            res.status(200).send("Updated successfully.");
        });
    } else {
        res.status(400).send("Not master branch.");
    }
});

// Start the webhook server on port 5000
app.listen(3000, () => {
    console.log("🚀 Webhook server running on port 3000");
});
