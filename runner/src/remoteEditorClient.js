const firebase = require('firebase');
const firepad = require('firepad');

class RemoteEditorClient {
    constructor() {
        firebase.initializeApp({
            apiKey: process.env['FIREBASE_API_KEY'],
            databaseURL: process.env['FIREBASE_DATABASE_URL']
        });
        this.firebaseRef = firebase.database().ref();
    }

    getText(sessionId) {
        const headless = new firepad.Headless(this.firebaseRef.child(sessionId));
        return new Promise((resolve) => {
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
