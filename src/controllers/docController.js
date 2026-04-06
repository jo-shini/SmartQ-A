const Document = require("../models/Document");

exports.getDocs = async (req, res, next) => {
    try {
        const docs = await Document.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: docs.length,
            data: docs
        });
    } catch (error) {
        next(error);
    }
}