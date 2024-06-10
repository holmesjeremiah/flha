import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests

const SubSignUp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        // Regular expression to match a valid phone number format (e.g., US phone number)
        const phoneRegex = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;

        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage('Please enter a valid phone number.');
            return; // Exit the function if phone number is invalid
        }

        try {
            // Send POST request to create object endpoint
            const response = await axios.post(process.env.REACT_APP_API_URL + 'phoneNumbers', {
                'phoneNumber': phoneNumber
            });
            console.log(response.data); // Log the response for debugging
            // Clear input field after successful submission
            setPhoneNumber('');
            setErrorMessage('');
            alert('You have successfully signed up for our SMS alerts!');
        } catch (error) {
            console.error('Error submitting phone number:', error);
            alert('Error submitting phone number. Please try again later.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='row' style={{ maxWidth: '1000px', backgroundColor: '#81D8EE', padding: '25px', borderRadius: '10px 10px  0 0' }}>
                <div className="col-sm-12 col-md-7 mb-3">
                    <div style={{ fontSize: '30px', textAlign: 'center' }}>Stay Informed with <strong>Hurricane Updates</strong>!</div>
                    <div style={{ fontSize: '15px', textAlign: 'center' }}>Stay informed with the latest news and alerts sent straight to your phone! By signing up, you'll receive real-time text message updates about upcoming hurricanes, evacuation notices, safety tips, and emergency resources. Don't miss out on critical information – stay safe and prepared!</div>
                </div>
                <div className='col-sm-12 col-md-5 align-middle' style={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                setErrorMessage(''); // Clear error message when input changes
                            }}
                        />
                        {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
                    </div>
                    <div className='align-bottom'>
                        <button type="button" className="btn btn-outline-dark" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubSignUp;
