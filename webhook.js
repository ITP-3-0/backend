const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json()); // Parse incoming JSON payloads

// Webhook route
app.post("/github-webhook", (req, res) => {
    console.log("Received webhook data:", req.body);
  
    const branch = req.body.ref;
    if (branch === "refs/heads/master") {
      // Handle the update logic
      console.log("🔄 Change detected on master branch.");
  
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
app.listen(5000, () => {
    console.log("🚀 Webhook server running on port 5000");
});
