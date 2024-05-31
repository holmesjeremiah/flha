import React from 'react';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

const AboutUs = () => {
    return (
        <div>
            <Nav />
            <section id="about-us" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center mb-4" style={{ fontSize: '60px' }}>About Us</h2>
                            <p className="lead text-center" style={{ fontSize: '30px' }}>Empowering Communities for Hurricane Preparedness</p>
                            <p>The primary objective of Frontline Hurricane Awareness is to educate and inform individuals about hurricane safety measures, preparedness, and response strategies. We are committed to empowering communities with the knowledge and resources needed to mitigate the impact of hurricanes and protect lives and property.</p>
                            <h3 className="mt-5 mb-3">Our Mission</h3>
                            <p>Our mission is to empower communities with the knowledge and resources needed to mitigate the impact of hurricanes and protect lives and property.</p>
                            <h3 className="mt-5 mb-3">Who We Are</h3>
                            <p>At Frontline Hurricane Awareness, our primary purpose is to educate and inform individuals about hurricane safety measures, preparedness, and response strategies. We aim to increase awareness about hurricane risks through informative blog posts and educational content, providing valuable insights and tips on storm tracking, evacuation planning, and post-disaster recovery.</p>
                            <p>By fostering community engagement, we encourage readers to share their experiences, ask questions, and participate in discussions to enhance collective hurricane preparedness and response.</p>
                            <p>We are committed to providing resources and recommendations for preferred vendors, supplies, and services to help individuals and communities effectively prepare for and recover from hurricanes.</p>
                            <h3 className="mt-5 mb-3">Our Goals</h3>
                            <ul>
                                <li><strong>Increase Awareness:</strong> Raise awareness about hurricane risks, safety measures, and preparedness strategies among residents in hurricane-prone regions.</li>
                                <li><strong>Educate and Inform:</strong> Provide valuable insights, tips, and advice on hurricane safety and preparedness.</li>
                                <li><strong>Drive Engagement:</strong> Foster community engagement and interaction by encouraging readers to share experiences and participate in discussions.</li>
                                <li><strong>Resource Provision:</strong> Offer lists of preferred vendors, supplies, and services/businesses to aid in hurricane preparedness and recovery.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUs;
