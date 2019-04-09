import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";

@inject('store')
@observer
class Aside extends Component {

    componentDidMount() {
        this.props.store.loadLanguages();
    }
    
    changeLanguage(event) {
        const lang = event.target.value;
        this.props.store.changeLanguage(lang);
    }

    run() {
        this.props.store.run();
    }
    clear() {
        this.props.store.clearOutput();
    }
    render() {
        const store = this.props.store;

        return (
            <Fragment>
                <style jsx="true">{`
                    .aside {
                        background: #678B8D;
                        flex: 0 0 20vw;
                        padding: 1em;
                    }
                    .aside * {
                        margin: 10px;
                    }
                    button span {
                        font-size: 2em;
                    }
                `}</style>
                <aside className='aside'>
                    <div>
                        <select value={store.language} onChange={this.changeLanguage.bind(this)}>
                            { store.languages.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>) }
                        </select>
                    </div>
                    <div>
                        <button className="btn" disabled={!store.runnable} onClick={this.run.bind(this)}>
                            <span role="img" aria-label="run">🎬</span>
                            <br />
                            RUN
                        </button>
                    </div>
                    <div>
                        <button className="btn" onClick={this.clear.bind(this)}>
                            <span role="img" aria-label="clear">📋</span>
                            <br />
                            CLEAR
                        </button>
                    </div>
                </aside>
            </Fragment>
        )
    }
}

export default Aside;
