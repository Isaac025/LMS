const { Webhook } = require("svix");
const USER = require("../models/user");

// API Controller Function to Manage Clerk User with database

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email._addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await USER.create(userData);
        res.status(201).json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email._address[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await USER.findByIdAndUpdate(data.id, userData);
        res.status(200).json({ success: true });
        break;
      }

      case "user.deleted": {
        await USER.findByIdAndDelete(data.id);
        res.json({});
      }

      default:
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = clerkWebhooks;
