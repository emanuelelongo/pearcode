const firebase = require('firebase');
const firepad = require('firepad');

class RemoteEditorClient {
    constructor(config) {
        firebase.initializeApp(config.firebase);
        this.firebaseRef = firebase.database().ref();
    }

    getText(sessionId) {
        const headless = new firepad.Headless(this.firebaseRef.child(sessionId));
        return new Promise((resolve, reject) => {
            headless.getText((text) => resolve(text));
        });
    }

    async getSession(sessionId) {
        const node = await new Promise(resolve => {
            this.firebaseRef.child(`${sessionId}`).on('value', v => resolve(v.val()))
        });
        const text = await this.getText(sessionId);
        return {
            sessionId,
            language: node.language,
            options: node.selectedOptions,
            text
        };
    }

    setOutput(sessionId, text) {
        this.firebaseRef.child(sessionId).update({output:text});
    }
}

module.exports = RemoteEditorClient;
