
import React, { Component } from 'react';
import { register } from './Auth';
import Nav from '../Components/Nav';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
            password: '',
            confirmPassword: '' // Add confirmPassword field
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Check if passwords match
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords do not match. Please re-enter.');
            return;
        }
        // Handle registration logic here
        register(this.state.username, this.state.phone, this.state.password);

    };

    render() {
        return (


            <div>
                <Nav />
                <div className="d-flex justify-content-center align-items-center text-light" style={{ minHeight: '80vh', backgroundColor: '#1b3a59' }}>
                    <form className="border p-4 rounded" style={{ width: '300px' }} onSubmit={this.handleSubmit}>
                        <h2 className="text-center mb-4">Register</h2>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter phone number"
                                value={this.state.phone}
                                onChange={(e) => this.setState({ phone: e.target.value })}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                required
                            />
                        </div>
                        <br />
                        {/* Add Re-enter Password field */}
                        <div className="form-group">
                            <label>Re-enter Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-enter password"
                                value={this.state.confirmPassword}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                required
                            />
                        </div>
                        <br />
                        {/* Change button text to "Register" */}
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                        <br />
                        <br />
                        <p>Already have an account? </p>

                        <button type="button" onClick={() => window.location.href = '/auth/login'} className="btn btn-primary btn-block">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;