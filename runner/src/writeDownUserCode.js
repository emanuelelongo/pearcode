const fs = require('fs');
const eol = require('eol');

module.exports = (session, langConfig) => {
    const { sessionId, language, text } = session;
    const main = langConfig.main;

    return new Promise((resolve, reject) => {
        console.log(`writing to: ${process.env['SESSIONS_PATH']}/${language}/${sessionId}/${main}`)
        fs.writeFile(`${process.env['SESSIONS_PATH']}/${language}/${sessionId}/${main}`, eol.auto(text), err =>  {
            if(err) 
                reject(err);
            else
                resolve();
        });
    });
};
