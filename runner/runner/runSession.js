const sh = require('shelljs');
const optionsToEnv = require('./optionsToEnv');

module.exports = (session, config) => {
    const { sessionId, language, options } = session;

    return new Promise((resolve, reject) => {
        const env = optionsToEnv(options);
        sh.exec(`${env} ${config.basePath}/languages/${language}/run.sh ${sessionId}`, (returnCode, output, err) => {
            if(err) return reject(err);
            resolve(output);
        });
    });
}
