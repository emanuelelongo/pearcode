import React, { Component, Fragment } from 'react';
import { Provider } from 'mobx-react';
import store from './store';
import { Header, Footer, Nav, Aside, Editor, Output } from './components';

class App extends Component {
    constructor(props) {
        super(props);
        this.mobxStore = store;
    }

    render() {
    return (
            <Fragment>
                <style jsx="true">{`
                .container {
                    display: flex;
                    min-height: 100vh;
                    flex-direction: row;
                    margin: 0;
                }
                .outer-col-2 {
                    display: flex;
                    flex-direction: column;
                    flex: 5;
                  }
                  .inner-row {
                    display: flex;
                    flex-direction: row;
                  }
                  .inner-col {
                    flex: 4;
                  }
                `}</style>
                <Provider store={this.mobxStore}>
                    <div className="container">
                        <Nav />
                        <div className="outer-col-2">
                            <Header />
                            <div className="inner-row">
                                <div className="inner-col">
                                    <Editor />
                                    <Output />
                                    <Footer />
                                </div>
                                <Aside />
                            </div>
                        </div>
                    </div>
                </Provider>
            </Fragment>
    );
  }
}

export default App;
