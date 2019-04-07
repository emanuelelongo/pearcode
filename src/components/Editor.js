import React, { Component, Fragment } from 'react';

class Editor extends Component{
    render() {
        return <Fragment>
            <style jsx="true">{`
                #firepad {
                    height: 67vh;
                }
            `}</style>
            <div id="firepad"></div>
        </Fragment>
    }
}

export default Editor;
