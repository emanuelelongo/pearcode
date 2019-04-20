import { action, observable } from 'mobx';
import editor from './utils/EditorFacade';
import config from './config';

class Store {
    @observable languages = [];
    @observable language = '';
    @observable runnable = false;
    @observable running = false;
    @observable options = [];
    @observable selectedOptions = {};
    @observable output = '';

    constructor() {
        this.consolePatched = false;
        this.loadLanguages();
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

    loadLanguages() {
        editor
            .getLanguages()
            .then((languages) => {
                this.languages = languages;
            });
    }

    @action initLanguage(lang) {
        this.language = lang;
        this.runnable = false;
        this.options = [];
        this.selectedOptions = {};
        if(config.languages[lang]) {
            this.runnable = config.languages[lang].runnable;
            this.options = config.languages[lang].options || [];
            this.selectedOptions = this.options.reduce(
		        (acc, cur)=>{acc[cur.name] = cur.values[0]; return acc;}, {}); 
        }
        editor.setLanguage(this.language);
    }

    @action changeLanguage = (lang) => {
        this.initLanguage(lang);
        editor.setSelectedOptions(this.selectedOptions);
    }

    @action run = async () => {
        this.running = true;
        this.clearOutput();
        
        if(this.language === 'javascript' && this.selectedOptions["Environment"] === "Browser") {
            await this.runJavascriptOnBrowser();
        }
        else {
            await this.runOnServer();
        }

        this.running = false;
    }

    @action selectOption = (optionName, value) => {
        this.selectedOptions[optionName] = value;
        editor.setSelectedOptions(this.selectedOptions);
    }

    runJavascriptOnBrowser() {
        this.patchConsole();
        const text = editor.getText();
        try {
            eval(text);
        }
        catch(err) {
            console.log(err);
        }
        return Promise.resolve();
    }

    runOnServer() {
        const sessionId = editor.getSessionId();
        return fetch(`${config.runnerEndPoint}/run`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({sessionId})
        });
    }

    @action clearOutput = () => {
        this.output = '';
        editor.setOutput(this.output);
    }
}

export default new Store();
