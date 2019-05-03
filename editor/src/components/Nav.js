import React, { Fragment } from 'react';

export default function() {
    return <Fragment>
            <style jsx="true">{`
                .nav {
                    background: #C5A362;
                    flex: 1;
                    padding: 1em;
                }
            `}</style>
        <nav className='nav'></nav>
        </Fragment>
}
