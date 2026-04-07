const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

exports.askLLM = async (question, context) => {
    const prompt = `
    You are a strict AI assistant.
    
    Answer ONLY using the provided context.
    If the answer is not in the context, say:
    "I don't know based on the given documents."

    Context:
    ${context}

    Question:
    ${question}

    Return ONLY valid JSON:
    {
        "answer": "...",
        "confidence": "high | medium | low"
    }
`;

    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "user", content: prompt }
        ],
        temperature: 0
    });

    return response.choices[0].message.content;
};
