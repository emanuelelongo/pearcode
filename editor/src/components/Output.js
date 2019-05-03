import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";

@inject('store')
@observer
class Output extends Component {
    render() {

        const output = this.props.store? this.props.store.output : "";

        return (
            <Fragment>
                <style jsx="true">{`
                    .output {
                        background: #ddd;
                        border: 1px solid #ccc;
                        height: 20vh;
                        padding: 0.5em;
                        overflow: hidden;
                    }
                    .output textarea {
                        border:none;
                        outline: none;
                        background: #ddd;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
            <div className='output'>
                <textarea readOnly value={output}></textarea>
            </div>
        </Fragment>
    )
    }
}

export default Output
