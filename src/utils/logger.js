exports.logAsk = ({ userId, question, latencyMs, confidence }) => {
    console.log(JSON.stringify({
        type: "ASK_LOG",
        timestamp: new Date().toISOString(),
        userId,
        question: question.slice(0, 50),
        latencyMs,
        confidence
    }));
};