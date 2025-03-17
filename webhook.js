const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/github-webhook", (req, res) => {
    // Ensure the request is coming from GitHub
    if (req.body.ref === "refs/heads/master") {
        console.log("🔄 Update detected! Pulling new changes...");

        // Run Git pull and restart the app
        exec("git pull origin master && npm install && pm2 restart backend-app", (err, stdout, stderr) => {
            if (err) {
                console.error(`❌ Error: ${err.message}`);
                return res.status(500).send("Error updating.");
            }
            console.log(`✅ Success: ${stdout}`);
            res.status(200).send("Updated successfully.");
        });
    } else {
        res.status(400).send("Not master branch.");
    }
});

// Start the webhook server
app.listen(5000, () => {
    console.log("🚀 Webhook server running on port 5000");
});
