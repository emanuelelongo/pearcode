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
                        border: 1px solid #ddd;
                        height: 20vh;
                        padding: 1em;
                        overflow:auto;
                    }
                    .output pre {
                        margin:0;
                        padding:0;
                    }
                `}</style>
            <div className='output'><pre>{output}</pre></div>
        </Fragment>
    )
    }
}

export default Output
