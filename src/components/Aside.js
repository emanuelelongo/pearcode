import React, { Component, Fragment } from 'react';
import { inject } from "mobx-react";
import editor from '../utils/EditorFacade';

@inject('store')
class Aside extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            language: '',
            languages: [],
            runnable: false
        };
    }

    componentDidMount() {
        editor
            .getLanguages()
            .then((languages) => {
                this.setState({
                    languages: languages,
                    language: "javascript",
                    runnable: true
                })
            });
    }
    
    changeLanguage(event) {
        const lang = event.target.value;
        this.setState({
                    language: lang,
                    runnable: this.state.languages.find(i => i.id===lang).runnable
                })
        editor.setLanguage(lang);
    }

    run() {
        const store = this.props.store;
        store.run();
    }
    render() {
        return (
            <Fragment>
                <style jsx="true">{`
                    .aside {
                        background: #678B8D;
                        flex: 1;
                        padding: 1em;
                    }
                    button span {
                        font-size: 2em;
                    }
                `}</style>
                <aside className='aside'>
                    <div>
                        <select value={this.state.language} onChange={this.changeLanguage.bind(this)}>
                            { this.state.languages.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>) }
                        </select>
                    </div>
                    <br />
                    <div>
                        <button disabled={!this.state.runnable} onClick={this.run.bind(this)}>
                            <span role="img" aria-label="run">🚀</span>
                            <br />
                            LAUNCH
                        </button>
                    </div>
                </aside>
            </Fragment>
        )
    }
}

export default Aside;
