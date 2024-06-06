
import axios from 'axios';

// Function to check if user is logged in
export function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}



///Function to log in the user
export async function login(phone, password) {
    try {
        // Send login request
        const response = await axios.post(process.env.REACT_APP_API_URL + 'login', { phone, password });

        // If login successful
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Perform actions on succes
        window.location.href = '/auth/dashboard';

        return response.data.user; // Return user data
    } catch (error) {
        // Handle login error
        console.log('Login error:', error.response.data);

        // Display error message to the user
        alert('Login failed. Please check your credentials and try again.');

        // Return null
        return null;
    }
}

// Function to log out the user
export function logout() {
    // Remove user data from local storage
    localStorage.removeItem('user');
    window.location.href = '/';
}

// Function to get the currently logged-in user
export function getCurrentUser() {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
        return JSON.parse(userData);
    } else {
        return { level: 'guest' };
    }
}

// Function to register a new user
export async function register(username, phone, password) {
    try {
        console.log({ username, phone, password });
        // Send registration request
        const response = await axios.post(process.env.REACT_APP_API_URL + 'register', { username, phone, password });

        // If registration successful
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Perform actions on success
        window.location.href = '/dashboard';


        // Return response data
        return response.data.user;
    } catch (error) {
        // Handle registration error
        console.log('Registration error:', error.response.data);

        // Display error message to the user
        alert('Registration failed. Please try again.');

        // Return null or any other value indicating registration failure
        return null;
    }
}