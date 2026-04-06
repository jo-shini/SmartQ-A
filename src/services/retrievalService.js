const Document = require('../models/Document');

exports.findRelavantDocs = async (question) => {
    const words = question.toLowerCase().split(" ");

    const docs = await Document.find();

    const scored = docs.map(doc => {
        let score = 0;
        words.forEach(word => {
            if (Content.includes(word)) {
                score++;
            }
            return { soc, score };
        })
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}