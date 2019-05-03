const sh = require('shelljs');
const shellescape = require('shell-escape');
const optionsToEnv = require('./optionsToEnv');

module.exports = (session, config) => {
    const { language, text, options } = session;

    return new Promise((resolve, reject) => {
        const env = optionsToEnv(options);
        sh.exec(`${env} ${config.basePath}/languages/${language}/run.sh ${shellescape([text])}`, (returnCode, output, err) => {
            if(err) return reject(err);
            
            resolve(output);
        });
    });
}
