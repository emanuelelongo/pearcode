import editor from './utils/EditorFacade';
import store from './store'; 

editor.onChangeLanguage(lang => {
    lang = lang || 'javascript';
	store.initLanguage(lang);
});

editor.onSelectedOptionsChange(selectedOptions => {
    if(!selectedOptions) return;
	store.selectedOptions = selectedOptions
});

editor.onChangeOutput(txt => store.output = txt || '');
