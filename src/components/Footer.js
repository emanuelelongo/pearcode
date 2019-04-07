import React, { Fragment } from 'react';

export default function() {
    return <Fragment>
            <style jsx="true">{`
                .footer {
                    background: gray;
                    height: 25px;
                    text-align: center;
                    color:#6B435A;
                    padding-top: 0.2em;
                    font-size: 12px;
                }
            `}</style>
        <footer className='footer'>
            Pear Code - Copyright 2019 - Emanuele Longo
        </footer>
        </Fragment>
}
