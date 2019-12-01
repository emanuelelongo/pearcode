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
        this.dataPath = process.env.DATA_PATH;
        this.runInDocker = process.env.RUN_IN_DOCKER;
        this.mountPath = this.runInDocker ? '/sessions' : this.dataPath;
        this.runAsUserId = process.env.RUN_AS_USER_ID;
        this.configureSh();
    }

    configureSh() {
        sh.env['DATA_PATH'] = this.dataPath;
        sh.env['MOUNT_PATH'] = this.mountPath;
        sh.env['RUN_AS_USER_ID'] = this.runAsUserId;
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
                await writeDownUserCode(this.mountPath, session, langConfig);
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