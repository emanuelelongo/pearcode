const ready = () => {
    return new Promise((resolve) => {
        if(window.monaco) return resolve();
        window.addEventListener('load', () => resolve())
    })
};
const runnableLanguages = {"javascript": true};

export default {
    getText: () => window.firepad.getText(),

    getLanguages: () => ready().then(() => {
        return window.monaco.languages.getLanguages()
            .map(i => ({
                id: i.id, 
                name: i.aliases[0],
                runnable: runnableLanguages[i.id]
            }))
    }),

    setLanguage: lang => {
        window.monaco.editor.setModelLanguage(window.firepad.monaco_.getModel(), lang);
        window.firepad.firebaseAdapter_.ref_.child('language').set(lang);
    },

    setOutput: txt => {
        window.firepad.firebaseAdapter_.ref_.child('output').set(txt);
    },

    onChangeLanguage: cb => {
        ready().then(() => {
            window.firepad.firebaseAdapter_.ref_.child("language").on("value", (value) => cb(value.val()));
        });
    },

    onChangeOutput: cb => {
        ready().then(() => {
            window.firepad.firebaseAdapter_.ref_.child("output").on("value", (value) => cb(value.val()));
        });
    }
}
