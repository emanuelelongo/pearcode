const sh = require('shelljs');
const optionsToEnv = require('./optionsToEnv');

module.exports = (session) => {
    const { sessionId, language, options } = session;

    return new Promise((resolve, reject) => {
        const env = optionsToEnv(options);
        sh.exec(`${env} ${__dirname}/src/languages/${language}/init.sh ${sessionId}`, (_returnCode, output, err) => {
            if(err) return reject(err);

            resolve(output);
        });
    });
};
