require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/mongodb");
const clerkWebhooks = require("./controllers/webhooks");

//Initialize Express
const app = express();

// Connect to database
connectDB();

//middleware
app.use(cors());

//Routes
app.get("/", (req, res) => res.send("API Working"));
app.post("/clerk", express.json(), clerkWebhooks);

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
