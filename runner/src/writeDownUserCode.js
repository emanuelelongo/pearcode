const fs = require('fs');
const eol = require('eol');

module.exports = (path, session, langConfig) => {
    const { sessionId, language, text } = session;
    const main = langConfig.main;

    return new Promise((resolve, reject) => {
        fs.writeFile(`${path}/${language}/${sessionId}/${main}`, eol.auto(text), err => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve();
        });
    });
};
