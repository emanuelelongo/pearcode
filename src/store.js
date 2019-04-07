import { action, observable } from 'mobx';
import editor from './utils/EditorFacade';

class Store {
    @observable languages = [];
    @observable language = 'javascript';
    @observable runnable = true;
    @observable output = '';

    constructor() {
        editor.onChangeLanguage((lang) => {
            if(lang != this.language) {
                this.changeLanguage(lang);
            }
        });
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
        const backup = console.log;
        const lines = [];
        console.log = (v) => lines.push(v);
        try {
            eval(editor.getText());
        }
        catch(err) {
            console.log(err);
        }
        this.output = lines.join('\n');
        console.log = backup;
    }
}

export default new Store();
