const monaco = () => {
    return new Promise((resolve) => {
        if(window.monaco) return resolve(window.monaco);
        window.addEventListener('load', () => resolve(window.monaco))
    })
};

const runnableLanguages = {"javascript": true};

export default {
    getText: () => window.firepad.getText(),
    getLanguages: () => monaco().then((m) => {
        return m.languages.getLanguages()
            .map(i => ({
                id: i.id, 
                name: i.aliases[0],
                runnable: runnableLanguages[i.id]
            }))
    }),
    setLanguage: lang => window.monaco.editor.setModelLanguage(window.firepad.monaco_.getModel(), lang)
}
