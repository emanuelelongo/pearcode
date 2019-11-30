const sh = require('shelljs');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const RemoteEditorClient = require('./remoteEditorClient');
const initSession = require('./initSession');
const writeDownUserCode = require('./writeDownUserCode');
const runSession = require('./runSession');
const runRepl = require('./runRepl');

class Runner {
    constructor() {
        this.config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'languages', 'config.yml'), 'utf8'));
        this.editor = new RemoteEditorClient();
        sh.env['LOCAL_SESSIONS_PATH'] = process.env['LOCAL_SESSIONS_PATH'];
        sh.env['CONTAINER_SESSIONS_PATH'] = process.env['CONTAINER_SESSIONS_PATH'];
        sh.env['RUN_AS_USER_ID'] = process.env['RUN_AS_USER_ID'];
        //TODO: check other variables to pass
    }

    async run(sessionId) {
        const session = await this.editor.getSession(sessionId);
        const { language } = session;
        const langConfig = this.config.languages[language];

        try {
            let output = '';
            if(langConfig.repl) {
                output = await runRepl(session);
            }
            else {
                await initSession(session);
                await writeDownUserCode(session, langConfig);
                output = await runSession(session);
            }

            this.editor.setOutput(sessionId, output);
        }
        catch(err) {
            this.editor.setOutput(sessionId, err);
            throw err;
        }
    }

    async getText(sessionId) {
        return await this.editor.getText(sessionId);
    }
}

module.exports = Runner;
