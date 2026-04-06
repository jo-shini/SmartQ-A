const { findRelavantDocs } = require('../services/retrievalService');
const { askLLM } = require("../services/llmService");
const { context } = require('langchain');

function getConfidence(score) {
    if (score > 3) return "high";
    if (score > 1) return "medium";
}

exports.askQuestion = async (req, res, next) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const reuslts = await askLLM(question, context);

        let parsed;
        try {
            parsed = JSON.parse(llmRaw);
        }
        catch {
            parsed = {
                answer: llmRaw,
                confidence: "low"
            };
        }
        const confidence = getConfidence(reuslts[0]?.score || 0);
        res.json({
            answer: parsed.answer,
            sources: reuslts.map(r => r.doc._id),
            confidence
        })
    } catch (err) {
        next(err)
    }
}