import React, { useEffect } from 'react';
import axios from 'axios';

const OAuthCallback = () => {
    useEffect(() => {
        const getAccessToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const response = await axios.post('https://api.freshbooks.com/api/auth/oauth/token', {
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: 'http://52.20.55.193:5173/oauth/callback',
                        client_id: '15386d9aa23a6d5ae85d4ca0fbc529bded76fb72159a028cc0b87a41832c10df',
                        client_secret: '365a70dbbb32c9ef5a9677412e753861766edacab164495cbdc2233b6d4f72fb'
                    });

                    const { access_token } = response.data;

                    // Store the access token in local storage
                    localStorage.setItem('freshbooks_access_token', access_token);
                    
                    // Optionally, redirect to another page after successful authentication
                    window.location.href = '/invoice'; // or any page you want to redirect to
                } catch (error) {
                    console.error('Error fetching access token:', error);
                }
            }
        };

        getAccessToken();
    }, []);

    return <div>Loading...</div>;
};

export default OAuthCallback;
