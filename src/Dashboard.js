
import React from 'react';
import { FaHome, FaUser, FaChartBar, FaCog } from 'react-icons/fa'; // Importing icons from react-icons library
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import { GrChapterAdd } from "react-icons/gr";
import { CiSquarePlus, CiEdit } from "react-icons/ci";

import { getCurrentUser, isLoggedIn, logout } from './Auth/Auth'; // Import necessary functions from '../Auth'
import Nav from './Components/Nav';
import axios from 'axios';
import Footer from './Components/Footer';
const Dashboard = () => {
    // Function to check if user is logged in
    function isLoggedIn() {
        return localStorage.getItem('user') !== null;
    }
    // Function to get the currently logged-in user
    function getCurrentUser() {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (userData) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    }
    if (!isLoggedIn()) {
        window.location.href = '/auth/login';
        return (
            <p></p>
        );
    }
    // Check if user is logged in before accessing user information
    const user = isLoggedIn() ? getCurrentUser() : null;

    return (
        <div>
            <Nav />
            <div className='text-light px-2 container-fluid' style={{ minHeight: '80vh', backgroundColor: '#1b3a59', }}>

                <div className='p-5 ' style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', justifyItems: 'center' }}>
                    <div className=''>
                        <h1>Dashboard</h1>
                    </div>
                    <div className=''>
                        {user && user.username} {/* Check if user exists before accessing username */}
                        <button type="button" onClick={() => logout()} className="btn btn-outline-light btn-block mx-3">Logout</button>
                    </div>

                </div>

                <div className="row">
                    {
                        user && user.level === 'admin' && // Check if user exists and is admin

                        <a href='/blog/create' className="col text-center " style={{ height: '200px', color: 'white', textDecoration: 'none' }}>
                            <CiSquarePlus size={50} />
                            <p>Create New Article</p>
                        </a>

                    }


                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;