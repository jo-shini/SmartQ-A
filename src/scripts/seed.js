require('dotenv').config();
const mongoose = require('mongoose');
const Document = require('../models/Document');

mongoose.connect(process.env.MONGO_URI);

const seedDocs = async () => {
    await Document.deleteMany();

    await Document.insertMany([
        {
            title: "Refund Policy",
            content: "Refunds are processed within 5-7 business dats after approval.",
            tags: ["refund", "payment"]
        },
        {
            title: "Cancellation Policy",
            content: "Orders can be cancelled within 24 hours of purchase",
            tags: ["cancel"]
        },
        {
            title: "Shipping info",
            content: "Orders are shipped within 2-3 business days.",
            tags: ["shipping"]
        },
        {
            title: "Account Help",
            content: "Users can reset passwords via the forgot password link",
            tags: ["account"]
        },
        {
            title: "Pricing",
            content: "All prices are inclusive of applicable taxes.",
            tags: ["pricing"]
        }
    ]);
    console.log("Seeded successfully");
    process.exit();
};
seedDocs();