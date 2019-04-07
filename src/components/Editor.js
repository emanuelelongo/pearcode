import React, { Component, Fragment } from 'react';

class Editor extends Component{
    render() {
        return <Fragment>
            <style jsx="true">{`
                #firepad {
                    height: calc(80vh - 125px);
                }
            `}</style>
            <div id="firepad"></div>
        </Fragment>
    }
}

export default Editor;
