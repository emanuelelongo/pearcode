const ready = () => {
    return new Promise((resolve) => {
        if(window.monaco) return resolve();
        window.addEventListener('load', () => resolve())
    })
};

export default {
    getText: () => window.firepad.getText(),

    getLanguages: () => ready().then(() => {
        return window.monaco.languages.getLanguages()
            .map(i => ({
                id: i.id, 
                name: i.aliases[0]
            }))
    }),

    setLanguage: lang => {
        ready().then(() => {
            window.monaco.editor.setModelLanguage(window.firepad.monaco_.getModel(), lang);
            window.firepad.firebaseAdapter_.ref_.child('language').set(lang);
        });
    },

    onChangeLanguage: cb => {
        ready().then(() => {
            window.firepad.firebaseAdapter_.ref_.child("language").on("value", (value) => cb(value.val()));
        });
    },

    setOutput: txt => {
        window.firepad.firebaseAdapter_.ref_.child('output').set(txt);
    },

    onChangeOutput: cb => {
        ready().then(() => {
            window.firepad.firebaseAdapter_.ref_.child("output").on("value", (value) => cb(value.val()));
        });
    },

    setSelectedOptions: options => {
        window.firepad.firebaseAdapter_.ref_.child('selectedOptions').set(options);
    },

    onSelectedOptionsChange: cb => {
        ready().then(() => {
            window.firepad.firebaseAdapter_.ref_.child("selectedOptions").on("value", (value) => cb(value.val()));
        });
    },

    getSessionId: () => {
        return window.location.hash.replace(/#/g, '');
    }
}
