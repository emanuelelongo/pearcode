import { action, observable } from 'mobx';
import editor from './utils/EditorFacade';

class Store {
    @observable languages = [];
    @observable language = 'javascript';
    @observable runnable = true;
    @observable running = false;
    @observable output = '';

    constructor() {
        this.consolePatched = false;

        editor.onChangeLanguage((lang) => {
            if(lang && lang !== this.language) {
                this.changeLanguage(lang);
            }
        });
        editor.onChangeOutput((txt) => {
           this.output = txt || '';
        });
    }

    patchConsole() {
        if(this.consolePatched) return;
        this.consolePatched = true;
        const consoles = ['log', 'info', 'error'];
        for(let c of consoles) {
            let backup = console[c];
            console[c] = (...args) => {    
                const line = args.join(' ');
                editor.setOutput(this.output ? this.output + '\n' + line : line);
                backup.apply(null, args);
            };
        }
    }

    @action loadLanguages = () => {
        editor
            .getLanguages()
            .then((languages) => {
                this.languages = languages;
            });
    }

    @action changeLanguage = (lang) => {
        editor.setLanguage(lang);
        this.language = lang;
        this.runnable = this.languages.find(i => i.id===lang).runnable;
    }

    @action run = () => {
        this.running = true;
        switch(this.language) {
            case 'javascript': this.runJavascript().then(() => this.running = false);
                break;
            case 'csharp': this.runCsharp().then(() => this.running = false);
                break;
        }
    }

    runJavascript() {
        this.patchConsole();
        try {
            eval(editor.getText());
        }
        catch(err) {
            console.log(err);
        }
        return Promise.resolve();
    }

    runCsharp() {
        return fetch(`https://runner.pearcode.it/csharp?id=${editor.getId()}`, {method: 'POST'});
    }

    @action clearOutput = () => {
        this.output = '';
        editor.setOutput(this.output);
    }
}

export default new Store();
