import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { TiThMenu } from 'react-icons/ti';
import { CiInstagram, CiFacebook, CiYoutube } from 'react-icons/ci';
import { PiTiktokLogo } from 'react-icons/pi';
import cover from '../cover.mp4';


function Header() {
    const headerStyle = {
        position: 'relative',
        backgroundColor: 'black',

        minHeight: '25rem',
        width: '100%',
        overflow: 'hidden',
        padding: '100px 25px'
    };

    const videoStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        zIndex: 0,
        transform: 'translateX(-50%) translateY(-50%)',
        msTransform: 'translateX(-50%) translateY(-50%)',
        mozTransform: 'translateX(-50%) translateY(-50%)',
        webkitTransform: 'translateX(-50%) translateY(-50%)'
    };

    const containerStyle = {
        position: 'relative',
        zIndex: 2
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#1b3a59',
        opacity: 0.8,
        zIndex: 1
    };

    return (
        <header style={headerStyle}>
            <div style={overlayStyle}></div>
            <video style={videoStyle} playsInline autoPlay muted loop>
                <source src={cover} type="video/mp4" />
            </video>
            <div className="container h-100" style={containerStyle}>
                <div className="d-flex h-100  align-items-center">
                    <div className="w-100 text-white">
                        <h1 className="display-3">Who we are...</h1>
                        <p className="lead mb-0 fs-5">
                            At Frontline Hurricane Awareness, our primary purpose is to educate and inform individuals about hurricane safety measures, preparedness, and response strategies. Our mission is to empower communities with the knowledge and resources needed to mitigate the impact of hurricanes and protect lives and property.
                            <br />
                            <br />
                            We aim to increase awareness about hurricane risks through informative blog posts and educational content, providing valuable insights and tips on storm tracking, evacuation planning, and post-disaster recovery. By fostering community engagement, we encourage readers to share their experiences, ask questions, and participate in discussions to enhance collective hurricane preparedness and response.
                            <br />
                            <br />
                            Click the button below to learn more...
                            <br />
                            <br />
                        </p>
                        <button style={{ backgroundColor: '#D3D7DC', padding: '15px 25px', borderRadius: '25px', fontSize: '20px' }}>About Us</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
