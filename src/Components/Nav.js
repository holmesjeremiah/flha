import React, { useState } from 'react';
import logo from '../logo.png';

function Nav() {

    return (
        <header className="sticky-top shadow-sm" style={{ backgroundColor: 'white' }}>
            <div className='row' style={{ margin: '0 auto' }}>
                <a className='col-sm-12 col-md-5' href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <img className='' src={logo} alt="logo" style={{ maxWidth: "6em", borderRadius: '50%' }} />
                    <h1 className='' style={{ fontSize: '25px', textAlign: 'center' }}>Frontline Hurricane Awareness</h1>
                </a>
                <div className='col-sm-12 col-md-7' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', fontSize: '20px', backgroundColor: '#D2D9DA', flexWrap: 'wrap' }} >
                    <a href="/blog" className=' link-offset-3 text-center align-middle' style={{ color: 'black', textDecoration: 'none', whiteSpace: 'nowrap', padding: '10px' }}>
                        Blog
                    </a>
                    <a href="/media" className=' link-offset-3 text-center align-middle' style={{ color: 'black', textDecoration: 'none', whiteSpace: 'nowrap', padding: '10px' }}>
                        Media
                    </a>
                    <a href="/resources" className=' link-offset-3 text-center align-middle' style={{ color: 'black', textDecoration: 'none', whiteSpace: 'nowrap', padding: '10px' }}>
                        Resources
                    </a>

                    <a href="/SafetyTips" className=' link-offset-3 text-center align-middle' style={{ color: 'black', textDecoration: 'none', whiteSpace: 'nowrap', padding: '10px' }}>
                        Safety Tips
                    </a>
                    <a href="/AboutUs" className=' link-offset-3 text-center align-middle' style={{ color: 'black', textDecoration: 'none', whiteSpace: 'nowrap', padding: '10px' }}>
                        About Us
                    </a>
                </div>
            </div>
        </header >
    );
}

export default Nav;
