import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'users');
            console.log(response.data.objects);
            setUsers(response.data.objects);
        } catch (error) {
            setError('Error fetching users: ' + error.message);
        }
    };

    const updateUserLevel = async (userId, newLevel) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}users/${userId}/updateNestedObject`, {
                path: 'level',
                new_value: newLevel
            });
            if (response.data.success) {
                setSuccess('User level updated successfully.');
                fetchUsers(); // Refresh users to get the updated data
            } else {
                setError('Error updating user level: ' + response.data.message);
            }
        } catch (error) {
            setError('Error updating user level: ' + error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLevelChange = (userId, event) => {
        const newLevel = event.target.value;
        setUsers(users.map(user =>
            user._id.$oid === userId ? { ...user, level: newLevel } : user
        ));
    };

    const handleSubmit = (userId, newLevel) => {
        updateUserLevel(userId, newLevel);
    };

    return (
        <div>
            <Nav />
            <div className='px-2 container-fluid' style={{ minHeight: '80vh' }}>
                <div className='p-5' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
                    <h1>User Management</h1>
                    <button onClick={fetchUsers} className="btn btn-primary">Refresh Users</button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div style={{ marginTop: '20px' }}>
                    {users.length > 0 ? (
                        <ul className="list-group">
                            {users.map(user => (
                                <li key={user._id.$oid} className="list-group-item" style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                                    {user.username} <br /> {user.phone}
                                    <div>
                                        <div className="input-group">
                                            <label className="input-group-text" htmlFor={`level-${user._id.$oid}`}>Level</label>
                                            <select
                                                className="form-select"
                                                aria-label="User Level"
                                                id={`level-${user._id.$oid}`}
                                                value={user.level}
                                                onChange={(e) => handleLevelChange(user._id.$oid, e)}
                                            >
                                                <option value="user">User</option>
                                                <option value="editor">Editor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            onClick={() => handleSubmit(user._id.$oid, user.level)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserManagement;
