require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/mongodb");
const clerkWebhooks = require("./controllers/webhooks");
const educatorRoute = require("./routes/educatorRoute");
const { clerkMiddleware } = require("@clerk/express");

//Initialize Express
const app = express();

// Connect to database
connectDB();

//middleware
app.use(cors());
app.use(clerkMiddleware());

//Routes
app.get("/", (req, res) => res.send("API Working"));
app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRoute);

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
