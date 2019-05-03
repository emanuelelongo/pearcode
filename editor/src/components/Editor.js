import React, { Component, Fragment } from 'react';

class Editor extends Component{
    render() {
        return <Fragment>
            <style jsx="true">{`
                .firepad-container {
                    height: calc(80vh - 125px);
                }
                #firepad {
                    height: 100%;
                }
            `}</style>
            <div className="firepad-container">
                <div id="firepad"></div>
            </div>
        </Fragment>
    }
}

export default Editor;
