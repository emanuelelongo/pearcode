const fs = require('fs');
const eol = require('eol');

module.exports = (session, config) => {
    const { sessionId, language, text } = session;
    const main = config.languages[language].main;

    return new Promise((resolve, reject) => {
        fs.writeFile(`${config.basePath}/languages/${language}/sessions/${sessionId}/${main}`, eol.auto(text), err =>  {
            if(err) 
                reject(err);
            else
                resolve();
        });
    });
};
