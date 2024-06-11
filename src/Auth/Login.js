import React, { Component } from 'react';
import { login } from './Auth';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        login(this.state.phone, this.state.password);


    };

    render() {
        return (
            <div>
                <Nav />
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', }}>
                    <form className="border p-4 rounded" style={{ width: '300px', backgroundColor: 'white' }} onSubmit={this.handleSubmit}>
                        <h2 className="text-center mb-4">Login</h2>
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
                        <button type="submit" className="btn btn-primary btn-block ">Login</button>
                        <br />
                        <br />
                        <p>Need an account? </p>
                        <button type="button" onClick={() => window.location.href = '/Auth/register'} className="btn btn-primary btn-block ">Register</button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Login;