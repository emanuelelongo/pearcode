const fs = require('fs');
const eol = require('eol');

module.exports = (session, langConfig) => {
    const { sessionId, language, text } = session;
    const main = langConfig.main;

    return new Promise((resolve, reject) => {
        fs.writeFile(`/sessions/${language}/${sessionId}/${main}`, eol.auto(text), err => {
            if (err) reject(err);
            else resolve();
        });
    });
};
