// EmailVerificationScreen.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerificationScreen = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/verify/${token}`);
                console.log(response.data.message);
                setVerificationStatus('Email verified successfully!');
                // Optionally, you can redirect the user to a login page or home page
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.error('Email verification failed:', error.message);
                setVerificationStatus('Email verification failed. Please try again.');
                // Handle the error or display a message to the user
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{verificationStatus}</p>
        </div>
    );
};

export default EmailVerificationScreen;
