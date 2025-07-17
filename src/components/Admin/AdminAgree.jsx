import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './AdminAgree.scss';

const AdminAgree = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const canvasRef = useRef(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('user'); // Retrieve user ID from local storage
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file); // Store the actual file
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => {
                    drawImageOnCanvas(image);
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const drawImageOnCanvas = (image) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const aspectRatio = image.width / image.height;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.width / aspectRatio;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    };

    const handleClear = () => {
        setUploadedFile(null);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (uploadedFile && userId) {
            try {
                const formData = new FormData();
                formData.append('image', uploadedFile); // Use the uploadedFile state
                formData.append('userId', userId); // Append the user ID

                // Make the API request
                const response = await axios.post('http://98.82.228.18:5001/api/sign/save', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Image uploaded successfully:', response.data);
                alert('Image uploaded successfully!'); // Notify user on success

            } catch (error) {
                console.error('Error uploading image:', error);
                console.error('Response data:', error.response?.data); // Log the response data for more details
                alert('Error uploading image. Please try again.'); // Notify user on error
            }
        } 
        else {
            alert('Please upload an image and ensure user ID is available before submitting.');
        }
    };

    return (
        <div className="image-upload">
            <div className="canvas-container">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    className="image-canvas"
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="upload-container">
                    <input
                        type="file"
                        accept="image/*" // Ensure only images can be uploaded
                        onChange={handleFileChange}
                    />
                </div>

                <div className="button-group">
                    <button type="button" className="btn-clear" onClick={handleClear}>Clear</button>
                    <button type="submit" className="btn-submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AdminAgree;