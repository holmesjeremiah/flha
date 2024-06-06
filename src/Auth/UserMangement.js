import { useState } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'users');
            //let articles = sortArticles('Latest',);
            //if (filterBy) {
            //  articles = filterArticles(filterBy, articles)
            //}

            setUsers(response.data.objects);

            console.log(response.data.objects);
        } catch (error) {
            console.error('Error fetching articles:', error);
            // Handle error gracefully
        }
    };
    return (
        <div>
            <Nav />
            <div className=' px-2 container-fluid' style={{ minHeight: '80vh', }}>

                <div className='p-5 ' style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', justifyItems: 'center' }}>
                    <div className=''>
                        <h1>User Management</h1>
                    </div>


                </div>

                <div style={{}}>
                    <div>

                    </div>


                </div>

            </div>
            <Footer />
        </div>
    )
};

export default UserManagement;