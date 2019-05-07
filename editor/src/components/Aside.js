import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";

@inject('store')
@observer
class Aside extends Component {
    
    changeLanguage(event) {
        const lang = event.target.value;
        this.props.store.changeLanguage(lang);
    }

    selectOption(option, value) {
        this.props.store.selectOption(option, value);
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
                    .aside .label {
                        margin-top: 5px;
                    }
                    button span {
                        font-size: 2em;
                    }
                    .link {
                        color: #6B435A;
                        font-weight: bold;
                        text-decoration: none;
                    }
                `}</style>
                <aside className='aside'>
                    <div>
                        <div>Language <a className="link" href="https://github.com/emanuelelongo/pearcode#supported-languages-so-far" title="Which languages are executable?">[?]</a></div>
                        <select value={store.language} onChange={this.changeLanguage.bind(this)}>
                            { store.languages.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>) }
                        </select>
                    </div>
                    {
                        store.options.map(opt =>
                            <div key={opt.name}>
                                <div>{opt.name}</div>
                                <select value={store.selectedOptions[opt.name]} onChange={(event) => this.selectOption(opt.name, event.target.value)}>
                                    { opt.values.map(value=> <option key={value} value={value}>{value}</option>) }
                                </select>
                            </div>
                        )
                    }
                    <div>
                        <button className="btn" disabled={!store.runnable || store.running} onClick={this.run.bind(this)}>
                            {
                                store.running
                                    ? <span role="img" aria-label="running">⌛</span>
                                    : <span role="img" aria-label="run">🎬</span>
                            }
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
