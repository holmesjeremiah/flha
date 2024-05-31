import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import horizontalCover from './horizonalCover.png';
import verticalCover from './verticalCover.png';

const Banner = () => {
    const [orientationHorizontal, setOrientationHorizontal] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };

    useEffect(() => {
        const handleResize = () => {
            setOrientationHorizontal(window.innerWidth >= 800);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            id="home"
            className=""
            style={{
                backgroundImage: `url(${orientationHorizontal ? horizontalCover : verticalCover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '10vh 0'

            }}
        >
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-10 col-md-5 text-center">
                        <img
                            src={logo}
                            alt="Navigation Logo"
                            className="img-fluid"
                            style={{ maxHeight: '60%' }}
                        />
                    </div>
                    <div className="col-12 col-md-5 text-center">
                        <h1 style={{ color: 'black', fontSize: '60px', }}>Frontline Hurricane Awareness</h1>
                        <h4 style={{ fontSize: '30px', color: 'black', fontWeight: 'bold' }}>Empowering Communities, Safeguarding Lives</h4>
                        <br />
                        <p style={{ color: 'black' }}>
                            Welcome to Frontline Hurricane Awareness! Our mission is to empower communities with the knowledge and resources needed for hurricane preparedness, safety, and recovery. Join us to stay informed and protect your community.
                        </p>
                        <div style={{ color: '#fff' }}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
