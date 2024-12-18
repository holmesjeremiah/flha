import React from 'react';
function Footer() {
    //const { isLoggedIn } = require('../Auth/AuthContext');
    return (
        <footer className="footer" style={{ backgroundColor: '#D2D9DA', padding: '20px 0', textAlign: 'center' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <nav className="footer-nav" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/blog" className='footer-link' style={{ color: 'black', textDecoration: 'none', padding: '10px', whiteSpace: 'nowrap' }}>
                        Blog
                    </a>
                    <a href="/resources" className='footer-link' style={{ color: 'black', textDecoration: 'none', padding: '10px', whiteSpace: 'nowrap' }}>
                        Resources
                    </a>
                    <a href="/SafetyTips" className='footer-link' style={{ color: 'black', textDecoration: 'none', padding: '10px', whiteSpace: 'nowrap' }}>
                        Safety Tips
                    </a>
                    <a href="/AboutUs" className='footer-link' style={{ color: 'black', textDecoration: 'none', padding: '10px', whiteSpace: 'nowrap' }}>
                        About Us
                    </a>
                </nav>
                {
                    /*
                    <a href="/auth/dashboard" style={{ color: 'black', textDecoration: 'none' }}>
                    {isLoggedIn ? 'Dashboard' : 'Login'}
                    </a>
                    */
                }
                <p style={{ margin: 0, color: 'black' }}>&copy; {new Date().getFullYear()} Frontline Hurricane Awareness</p>
            </div>
        </footer>
    );
}

export default Footer;
