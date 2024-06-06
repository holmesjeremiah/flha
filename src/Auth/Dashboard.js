
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

import { logout } from './Auth'; // Import necessary functions from '../Auth'
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";


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
            <div className=' px-2 container-fluid' style={{ minHeight: '80vh', }}>

                <div className='p-5 ' style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', justifyItems: 'center' }}>
                    <div className=''>
                        <h1>Dashboard</h1>
                    </div>
                    <div className=''>
                        {user && user.username} {/* Check if user exists before accessing username */}
                        <button type="button" onClick={() => logout()} className="btn btn-outline-dark btn-block mx-3">Logout</button>
                    </div>

                </div>

                <div className="row">
                    {
                        user && user.level === 'admin' && // Check if user exists and is admin

                        <a href='/blog/create' className="col text-center " style={{ height: '200px', color: 'black', textDecoration: 'none' }}>
                            <MdOutlinePostAdd size={50} />
                            <p>Create New Article</p>
                        </a>

                    }
                    {
                        user && user.level === 'admin' && // Check if user exists and is admin

                        <a href='/media/create' className="col text-center " style={{ height: '200px', color: 'black', textDecoration: 'none' }}>
                            <MdOutlineAddPhotoAlternate size={50} />
                            <p>Create New Media Post</p>
                        </a>

                    }
                    {
                        user && user.level === 'admin' && // Check if user exists and is admin

                        <a href='/auth/usermanagement' className="col text-center " style={{ height: '200px', color: 'black', textDecoration: 'none' }}>
                            <MdOutlineAddPhotoAlternate size={50} />
                            <p>User Management</p>
                        </a>

                    }


                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;