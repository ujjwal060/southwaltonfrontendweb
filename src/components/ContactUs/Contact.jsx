import React, { useState } from 'react';
import './Contact.scss';
import img from './img/img.png';
import axios from 'axios';

const Contact = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        startDate: '',
        enddate: '',
        comments: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    const userDataToSend = {
        name: userData.name,
        email: userData.email,
        startDate: userData.startDate,
        enddate: userData.enddate,
        comments: userData.comments
    };

        try {
            const response = await axios.post(`http://44.196.64.110:5001/api/create/creeate`, userDataToSend, {
                headers: {
                    'Content-Type': 'application/json'  
                },
            });
            console.log('User request updated:', response.data);
            alert('Query sent successfully!');
        } catch (error) {
            console.error('Error sending query', error);
            alert('Error sending query. Please try again.');
        }
    };

    return (
        <div className='contactus'>
            <div className="page">
                <div className='part-1'>
                    <img src={img} alt="" />
                </div>
                <div className='part-2'>
                    <form onSubmit={handleSubmit}>
                        <div className='fields'>
                            <p>Name</p>
                            <input
                                type="text"
                                placeholder='Enter Name'
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='fields'>
                            <p>Email</p>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='time'>
                            <div>
                                <p>Start Time</p>
                                <input
                                    type="date"
                                    placeholder='Start Time'
                                    name="startDate"
                                    value={userData.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p>End Time</p>
                                <input
                                    type="date"
                                    placeholder='End Time'
                                    name="enddate"
                                    value={userData.enddate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='fields'>
                            <p>Comments</p>
                            <textarea
                                placeholder='Comments'
                                name="comments"
                                value={userData.comments}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className='Submit'>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
