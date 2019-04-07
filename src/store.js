import { action, observable } from 'mobx';
import editor from './utils/EditorFacade';

class Store {
    @observable output = '';

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
