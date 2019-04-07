import React, { Fragment } from 'react';

export default function() {
    return <Fragment>
            <style jsx="true">{`
                .footer {
                    background: #6B435A;
                    height: 3vh;
                    text-align: center;
                    color:gray;
                    padding-top: 0.2em;
                }
            `}</style>
        <footer className='footer'>
            Pear Code - Copyright 2019 - Emanuele Longo
        </footer>
        </Fragment>
}
