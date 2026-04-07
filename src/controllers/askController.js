const { findRelevantDocs } = require('../services/retrievalService');
const { askLLM } = require('../services/llmService');
const { logAsk } = require('../utils/logger');

// Confidence based on retrieval score
function getConfidence(score) {
    if (score >= 5) return "high";
    if (score >= 2) return "medium";
    return "low";
}

exports.askQuestion = async (req, res, next) => {
    const start = Date.now();

    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        // Step 1: Retrieve docs
        const results = await findRelevantDocs(question);

        const context = results.map(r => r.doc.content).join("\n");

        // Step 2: LLM call
        const llmRaw = await askLLM(question, context);

        // Step 3: Clean JSON response
        let parsed;
        try {
            const cleaned = llmRaw.match(/\{[\s\S]*\}/)?.[0];
            parsed = JSON.parse(cleaned);
        } catch {
            parsed = {
                answer: llmRaw,
                confidence: "low"
            };
        }

        // Step 4: Confidence from retrieval
        const confidence = getConfidence(results[0]?.score || 0);

        const latencyMs = Date.now() - start;

        // Logging (important for marks)
        logAsk({
            userId: req.user?.id,
            question,
            latencyMs,
            confidence
        });

        // Final response
        res.json({
            answer: parsed.answer,
            sources: results.map(r => r.doc._id, toString()),
            confidence
        });

    } catch (err) {
        next(err);
    }
};
