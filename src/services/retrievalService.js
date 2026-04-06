const Document = require('../models/Document');
const { getEmbedding } = require('./embeddingService');

exports.findRelavantDocs = async (question) => {
    const queryEmbedding = await getEmbedding(question)

    const docs = await Document.find();

    const scored = await Promise.all(
        docs.map(async (doc) => {
            const docEmbedding = await getEmbedding(doc.content);
            const score = consineSimilarity(queryEmbedding, docEmbedding);
            return { doc, score };
        }))

    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}