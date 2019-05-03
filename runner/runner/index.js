const sh = require('shelljs');
const RemoteEditorClient = require('./remoteEditorClient');
const initSession = require('./initSession');
const writeDownUserCode = require('./writeDownUserCode');
const runSession = require('./runSession');
const runRepl = require('./runRepl');

class Runner {
    constructor(config) {
        this.config = config;
        this.editor = new RemoteEditorClient(this.config);
        sh.env['BASE_PATH'] = config.basePath;
        sh.env['RUN_AS_USER_ID'] = config.runAsUserId;
    }

    async run(sessionId) {
        const session = await this.editor.getSession(sessionId);
        const { language, text, options } = session;
        const langConfig = this.config.languages[language];

        try {
            let output = '';
            if(langConfig.repl) {
                output = await runRepl(session, this.config);
            }
            else {
                await initSession(session, this.config);
                await writeDownUserCode(session, this.config);
                output = await runSession(session, this.config);
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
