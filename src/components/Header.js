import React, { Fragment } from 'react';

export default function() {
    return <Fragment>
            <style jsx="true">{`
                .header {
                    background: #6B435A;
                    color: white;
                    height: 100px;
                    padding-left: 0.5em;
                }
                .pearImg {
                    font-size: 1.7em;
                }
                .pear {
                    margin-left: 0.2em;
                    font-size: 1.7em;
                    font-family: 'Lobster', cursive;
                }
                .code {
                    font-size: 1.6em;
                    font-family: 'Roboto Mono', monospace;
                }
                .description {
                    position: absolute;
                    right: 20vw;
                    font-size: 0.4em;
                }
            `}</style>
        <header className='header'>
            <h1>
                <span className="pearImg" role="img" aria-label="a pear">&#127824;</span>
                <span className="pear">Pear</span>
                &nbsp;
                <span className="code">code_</span>
                <span className="description">share the URL, enjoy!</span>
            </h1>
        </header>
        </Fragment>
}
