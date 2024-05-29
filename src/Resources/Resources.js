import React from 'react';
import { FaWater, FaSatelliteDish, FaHome, FaCloud, FaLifeRing } from "react-icons/fa";
import VendorList from './VendorList';
import Nav from '../Components/Nav';
import CompanyCard from './CompanyCard';
import Footer from '../Components/Footer';

const Resources = () => {
    const companyInfoList = [
        {
            companyName: 'StormShield Solutions',
            companyWebsite: 'www.stormshield.com',
            companyPhoneNumber: '(987) 654-3210',
            companyDescription: 'Providing advanced hurricane prediction and protection systems to safeguard communities.',
            icon: <FaWater size={'50px'} />
        },
        {
            companyName: 'Hurricane Watchers Inc.',
            companyWebsite: 'www.hurricanewatchers.com',
            companyPhoneNumber: '(555) 123-4567',
            companyDescription: 'Offering real-time hurricane tracking and updates for preparedness and safety.',
            icon: <FaSatelliteDish size={'50px'} />
        },
        {
            companyName: 'Safe Haven Enterprises',
            companyWebsite: 'www.safehaven.com',
            companyPhoneNumber: '(888) 765-4321',
            companyDescription: 'Specializing in hurricane-resistant construction materials and shelter solutions.',
            icon: <FaHome size={'50px'} />
        },
        {
            companyName: 'WeatherGuard Technologies',
            companyWebsite: 'www.weatherguardtech.com',
            companyPhoneNumber: '(444) 222-3333',
            companyDescription: 'Developing cutting-edge weather monitoring tools and early warning systems for hurricanes.',
            icon: <FaCloud size={'50px'} />
        },
        {
            companyName: 'Rescue Ready Systems',
            companyWebsite: 'www.rescueready.com',
            companyPhoneNumber: '(333) 444-5555',
            companyDescription: 'Equipping first responders with the latest tools and information to efficiently manage hurricane emergencies.',
            icon: <FaLifeRing size={'50px'} />
        }
    ];

    return (
        <div>
            <Nav />
            <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} id="safety-tips" className="py-5">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center mb-4">Resources</h2>
                            <p className="lead text-center">A Collection of Vendors, Suppliers, and Recommended Companies</p>
                            <div className='row' style={{ display: 'flex', justifyContent: 'center', }}>
                                <div className='col-md-6'>
                                    <h3 className="mt-5 mb-3">Post-Hurricane Recovery</h3>
                                    <p>Find companies offering post-hurricane recovery services and supplies.</p>
                                    {companyInfoList.slice(1, 5).map((companyInfo, index) => <CompanyCard key={index} companyInfo={companyInfo} />)}
                                </div>
                                <div className='col-md-6'>
                                    <h3 className="mt-5 mb-3">Technology and Tools</h3>
                                    <p>Discover companies providing technology and tools for hurricane preparedness.</p>
                                    {companyInfoList.slice(3, 5).map((companyInfo, index) => <CompanyCard key={index} companyInfo={companyInfo} />)}
                                </div>
                                <div className='col-md-6'>
                                    <h3 className="mt-5 mb-3">Home Protection</h3>
                                    <p>Explore companies offering home protection solutions against hurricanes.</p>
                                    {companyInfoList.slice(1, 3).map((companyInfo, index) => <CompanyCard key={index} companyInfo={companyInfo} />)}
                                </div>
                                <div className='col-md-6'>
                                    <h3 className="mt-5 mb-3">Communication and Information</h3>
                                    <p>Access companies providing communication and information services during hurricanes.</p>
                                    {companyInfoList.slice(2, 4).map((companyInfo, index) => <CompanyCard key={index} companyInfo={companyInfo} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Resources;
