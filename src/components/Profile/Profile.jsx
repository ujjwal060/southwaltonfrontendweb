  // import React, { useState, useEffect } from 'react';
  // import './Profile.scss';
  // import Upload from "./img/Upload.png";
  // import Upload1 from './img/Upload1.png';
  // import axios from 'axios';

  // const ProfileUpdate = () => {
  //   const [userData, setUserData] = useState({
  //     fullName: '',
  //     email: '',
  //     phoneNumber: '',
  //     state: ''
  //   });
  //   const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       const userStr = localStorage.getItem('user');
  //       const user = JSON.parse(userStr);
  //       setUser(user);
  //       console.log("user", user);

  //       if (user) {
  //         try {
  //           const response = await axios.get(`http://44.196.64.110:5001/api/user/${user}`);
  //           setUserData(response.data.data); // Set user data in state
  //           console.log("response", response.data.data);
  //         } catch (error) {
  //           console.error('Error fetching user data:', error);
  //         }
  //       }
  //     };

  //     fetchUserData();
  //   }, []);  // Empty dependency array means this runs once on component mount

  //   const handleInputChange = (e) => {
  //     const { id, value } = e.target;
  //     setUserData((prevUserData) => ({
  //       ...prevUserData,
  //       [id]: value, // Update the specific field in the state
  //     }));
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try { 
  //       const response = await axios.put(`http://44.196.64.110:5001/api/user/${user}`, userData);
  //       console.log('User data updated:', response.data);
  //     } catch (error) {
  //       console.error('Error updating user data:', error);
  //     }
  //   };

  //   return (
  //     <div className="profile-update">
  //       <div className="profile1">
  //         <div className="image-section">
  //           <img src={Upload} alt="Profile" />
  //           <input type="image" />
  //         </div>
  //         <div className="field-section">
  //           <form className="profile-form" onSubmit={handleSubmit}>
  //             <div className="form-group">
  //               <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name</label>
  //               <input 
  //                 type="text" 
  //                 id="fullName" 
  //                 value={userData.fullName} // Display fetched data
  //                 onChange={handleInputChange} 
  //                 placeholder="Enter your full name" 
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
  //               <input 
  //                 type="email" 
  //                 id="email" 
  //                 value={userData.email} // Display fetched data
  //                 onChange={handleInputChange} 
  //                 placeholder="Enter email" 
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
  //               <input 
  //                 type="tel" 
  //                 id="phoneNumber" 
  //                 value={userData.phoneNumber} // Display fetched data
  //                 onChange={handleInputChange} 
  //                 placeholder="Enter Phone Number" 
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
  //               <input 
  //                 type="text" 
  //                 id="state" 
  //                 value={userData.state} // Display fetched data
  //                 placeholder="Enter your state" 
  //                 onChange={handleInputChange} 
  //               />
  //             </div>
  //             <div className="button-profile">
  //               <button type="button">Cancel</button>
  //               <button type="submit">Save</button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>

  //       <hr style={{ width: "90%" }} />

  //       <div className="profile2">
  //         <div className="image-section">
  //           <img src={Upload1} alt="Profile" />
  //           </div>
  //         <div className="field-section">
  //           <form className="profile-form">
  //             <div className="form-group">
  //               <label htmlFor="currentPassword"><i className="fa-solid fa-lock"></i> Current Password </label>
  //               <input 
  //                 type="password" 
  //                 id="currentPassword" 
  //                 placeholder="Enter current password" 
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label htmlFor="newPassword"><i className="fa-solid fa-lock"></i> New Password </label>
  //               <input 
  //                 type="password" 
  //                 id="newPassword" 
  //                 placeholder="Enter new password" 
  //               />
  //             </div>
  //             <div className="button-profile">
  //               <button type="button">Cancel</button>
  //               <button type="submit">Save</button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default ProfileUpdate;
    // import React, { useState, useEffect,useRef } from 'react';
    // import './Profile.scss';
    // import Upload from "./img/Upload.png";
    // import Upload1 from './img/Upload1.png';
    // import axios from 'axios';
    
    // const ProfileUpdate = () => {
    //   const [userData, setUserData] = useState({
    //     fullName: '',
    //     email: '',
    //     phoneNumber: '',
    //     state: ''
    //   });
    //   const [user, setUser] = useState(null);
    //   const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    //   const [imagePreview, setImagePreview] = useState(Upload); // Default image preview
    
    //   useEffect(() => {
    //     const fetchUserData = async () => {
    //       const userStr = localStorage.getItem('user');
    //       const user = JSON.parse(userStr);
    //       setUser(user);
    //       console.log("user", user);
    
    //       if (user) {
    //         try {
    //           const response = await axios.get(`http://44.196.64.110:5001/api/user/${user}`);
    //           setUserData(response.data.data); // Set user data in state
    //           console.log("response", response.data.data);
    //         } catch (error) {
    //           console.error('Error fetching user data:', error);
    //         }
    //       }
    //     };
    
    //     fetchUserData();
    //   }, []); // Empty dependency array means this runs once on component mount
    
    //   const handleInputChange = (e) => {
    //     const { id, value } = e.target;
    //     setUserData((prevUserData) => ({
    //       ...prevUserData,
    //       [id]: value, // Update the specific field in the state
    //     }));
    //   };
    
    //   const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       setSelectedImage(file);
    //       setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    //     }
    //   };
    
    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
        
    //     // Append user data
    //     formData.append('fullName', userData.fullName);
    //     formData.append('email', userData.email);
    //     formData.append('phoneNumber', userData.phoneNumber);
    //     formData.append('state', userData.state);
    
    //     // Append selected image if available
    //     if (selectedImage) {
    //       formData.append('profileImage', selectedImage);
    //     }
    
    //     try {
    //       const response = await axios.put(`http://44.196.64.110:5001/api/user/${user}`, formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data', // Important for file uploads
    //         },
    //       });
    //       console.log('User data updated:', response.data);
    //     } catch (error) {
    //       console.error('Error updating user data:', error);
    //     }
    //   };
    //   const inputRef=useRef(null);
    //   const handleClickImage=()=>{
    //     inputRef.current.click()
    //   }
    
    //   return (
    //     <div className="profile-update">
    //       <div className="profile1" onClick={handleClickImage}>
    //         <div className="image-section">
    //           <img src={imagePreview} alt="Profile Preview" />
    //           <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{display:'none'}}/>
    //         </div>
    //         <div className="field-section">
    //           <form className="profile-form" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //               <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name</label>
    //               <input 
    //                 type="text" 
    //                 id="fullName" 
    //                 value={userData.fullName} // Display fetched data
    //                 onChange={handleInputChange} 
    //                 placeholder="Enter your full name" 
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
    //               <input 
    //                 type="email" 
    //                 id="email" 
    //                 value={userData.email} // Display fetched data
    //                 onChange={handleInputChange} 
    //                 placeholder="Enter email" 
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
    //               <input 
    //                 type="tel" 
    //                 id="phoneNumber" 
    //                 value={userData.phoneNumber} // Display fetched data
    //                 onChange={handleInputChange} 
    //                 placeholder="Enter Phone Number" 
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
    //               <input 
    //                 type="text" 
    //                 id="state" 
    //                 value={userData.state} // Display fetched data
    //                 placeholder="Enter your state" 
    //                 onChange={handleInputChange} 
    //               />
    //             </div>
    //             <div className="button-profile">
    //               <button type="button">Cancel</button>
    //               <button type="submit">Save</button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    
    //       <hr style={{ width: "90%" }} />
    
    //       <div className="profile2">
    //         <div className="image-section">
    //           <img src={Upload1} alt="Profile" />
    //           </div>
    //         <div className="field-section">
    //           <form className="profile-form">
    //             <div className="form-group">
    //               <label htmlFor="currentPassword"><i className="fa-solid fa-lock"></i> Current Password </label>
    //               <input 
    //                 type="password" 
    //                 id="currentPassword" 
    //                 placeholder="Enter current password" 
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label htmlFor="newPassword"><i className="fa-solid fa-lock"></i> New Password </label>
    //               <input 
    //                 type="password" 
    //                 id="newPassword" 
    //                 placeholder="Enter new password" 
    //               />
    //             </div>
    //             <div className="button-profile">
    //               <button type="button">Cancel</button>
    //               <button type="submit">Save</button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // };
    
    // export default ProfileUpdate;
// import React, { useState, useEffect, useRef } from 'react';
// import './Profile.scss';
// import Upload from "./img/Upload.png";
// import Upload1 from './img/Upload1.png';
// import axios from 'axios';

// const ProfileUpdate = () => {
//   const [userData, setUserData] = useState({
    
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     state: ''
//   });
//   const [user, setUser] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null); // State for selected image
//   const [imagePreview, setImagePreview] = useState(Upload); // Default image preview
//   const inputRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userStr = localStorage.getItem('user');
//       const user = JSON.parse(userStr);
//       setUser(user);
//       console.log("user", user);

//       if (user) {
//         try {
//           const response = await axios.get(`http://44.196.64.110:5001/api/user/${user}`);
//           setUserData(response.data.data); // Set user data in state
//           console.log("response", response.data.data);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, []); // Empty dependency array means this runs once on component mount

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [id]: value, // Update the specific field in the state
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = canvasRef.current;
//           const context = canvas.getContext('2d');
//           const size = Math.min(img.width, img.height);
          
//           canvas.width = size;
//           canvas.height = size;
//           context.drawImage(
//             img,
//             (img.width - size) / 2, // Center the image horizontally
//             (img.height - size) / 2, // Center the image vertically
//             size,
//             size,
//             0,
//             0,
//             size,
//             size
//           );
          
//           const dataURL = canvas.toDataURL('image/jpeg');
//           setImagePreview(dataURL);
//         };
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     const formData = new FormData();
    
//     // Append user data
//     formData.append('fullName', userData.fullName);
//     formData.append('email', userData.email);
//     formData.append('phoneNumber', userData.phoneNumber);
//     formData.append('state', userData.state);
//     formData.append('profileImage', selectedImage);
//     // Append selected image if available
//     // if (selectedImage) {
      
//     // }

//     try {
//       const response = await axios.put(`http://44.196.64.110:5001/api/user/${user}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Important for file uploads
//         },
//       });
//       console.log('User data updated:', response.data);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       alert('Error updating profile. Please try again.');
//     }
//   };

//   const handleClickImage = (e) => {
//     e.stopPropagation(); // Prevent event bubbling
//     inputRef.current.click();
//   };

//   return (
//     <div className="profile-update">
//       <div className="profile1" onClick={handleClickImage}>
//         <div className="image-section">
//           <img src={imagePreview} alt="Profile Preview" />
//           <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{display:'none'}} />
//           <canvas ref={canvasRef} style={{display: 'none'}}></canvas> {/* Hidden canvas for processing */}
//         </div>
//         <div className="field-section">
//           <form className="profile-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name</label>
//               <input 
//                 type="text" 
//                 id="fullName" 
//                 value={userData.fullName} // Display fetched data
//                 onChange={handleInputChange} 
//                 placeholder="Enter your full name" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
//               <input 
//                 type="email" 
//                 id="email" 
//                 value={userData.email} // Display fetched data
//                 onChange={handleInputChange} 
//                 placeholder="Enter email" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
//               <input 
//                 type="tel" 
//                 id="phoneNumber" 
//                 value={userData.phoneNumber} // Display fetched data
//                 onChange={handleInputChange} 
//                 placeholder="Enter Phone Number" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
//               <input 
//                 type="text" 
//                 id="state" 
//                 value={userData.state} // Display fetched data
//                 placeholder="Enter your state" 
//                 onChange={handleInputChange} 
//               />
//             </div>
//             <div className="button-profile">
//               {/* <button type="button" onClick={(e) => e.stopPropagation()}>Cancel</button> */}
//               <button type="submit">Save</button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <hr style={{ width: "90%" }} />

//       <div className="profile2">
//         <div className="image-section">
//           <img src={Upload1} alt="Profile" />
//         </div>
//         <div className="field-section">
//           <form className="profile-form">
//             <div className="form-group">
//               <label htmlFor="currentPassword"><i className="fa-solid fa-lock"></i> Current Password </label>
//               <input 
//                 type="password" 
//                 id="currentPassword" 
//                 placeholder="Enter current password" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="newPassword"><i className="fa-solid fa-lock"></i> New Password </label>
//               <input 
//                 type="password" 
//                 id="newPassword" 
//                 placeholder="Enter new password" 
//               />
//             </div>
//             <div className="button-profile">
//               <button type="button">Cancel</button>
//               {/* <button type="submit">Save</button> */}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;
// import React, { useState, useRef, useEffect } from 'react';
// import './Profile.scss';
// import Upload from "./img/Upload.png";
// import Upload1 from './img/Upload1.png';
// import axios from 'axios';

// const ProfileUpdate = () => {
//   const [userData, setUserData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     state: '',
//     image: ''
//   });
//   const [user, setUser] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(Upload);
//   const inputRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userStr = localStorage.getItem('user');
//       const user = JSON.parse(userStr);
//       setUser(user);

//       if (user) {
//         try {
//           const response = await axios.get(`http://44.196.64.110:5001/api/user/${user}`);
//           setUserData(response.data.data);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [id]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = canvasRef.current;
//           const context = canvas.getContext('2d');
//           const size = Math.min(img.width, img.height);

//           canvas.width = size;
//           canvas.height = size;
//           context.drawImage(
//             img,
//             (img.width - size) / 2,
//             (img.height - size) / 2,
//             size,
//             size,
//             0,
//             0,
//             size,
//             size
//           );

//           const dataURL = canvas.toDataURL('image/jpeg');
//           setImagePreview(dataURL);
//         };
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append('fullName', userData.fullName);
//     formData.append('email', userData.email);
//     formData.append('phoneNumber', userData.phoneNumber);
//     formData.append('state', userData.state);
//     if (selectedImage) {
//       formData.append('image', selectedImage);
//       console.log("image",formData);
//     }

//     try {
//       const response = await axios.put(`http://44.196.64.110:5001/api/user/${user}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('User data updated:', response.data);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       alert('Error updating profile. Please try again.');
//     }
//   };

//   const handleClickImage = (e) => {
//     e.stopPropagation();
//     inputRef.current.click();
//   };

//   return (
//     <div className="profile-update">
//       <div className="profile1">
//         <div className="image-section" onClick={handleClickImage}>
//           <img src={imagePreview} alt="Profile Preview" />
//           <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{display: 'none'}} />
//           <canvas ref={canvasRef} style={{display: 'none'}}></canvas>
//         </div>
//         <div className="field-section">
//           <form className="profile-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name</label>
//               <input 
//                 type="text" 
//                 id="fullName" 
//                 value={userData.fullName}
//                 onChange={handleInputChange} 
//                 placeholder="Enter your full name" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
//               <input 
//                 type="email" 
//                 id="email" 
//                 value={userData.email}
//                 onChange={handleInputChange} 
//                 placeholder="Enter email" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
//               <input 
//                 type="tel" 
//                 id="phoneNumber" 
//                 value={userData.phoneNumber}
//                 onChange={handleInputChange} 
//                 placeholder="Enter Phone Number" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
//               <input 
//                 type="text" 
//                 id="state" 
//                 value={userData.state}
//                 onChange={handleInputChange} 
//                 placeholder="Enter your state" 
//               />
//             </div>
//             <div className="button-profile">
//               <button type="button">Cancel</button>
//               <button type="submit">Save</button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <hr style={{ width: "90%" }} />

//       <div className="profile2">
//         <div className="image-section">
//           <img src={Upload1} alt="Profile" />
//         </div>
//         <div className="field-section">
//           <form className="profile-form">
//             <div className="form-group">
//               <label htmlFor="currentPassword"><i className="fa-solid fa-lock"></i> Current Password </label>
//               <input 
//                 type="password" 
//                 id="currentPassword" 
//                 placeholder="Enter current password" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="newPassword"><i className="fa-solid fa-lock"></i> New Password </label>
//               <input 
//                 type="password" 
//                 id="newPassword" 
//                 placeholder="Enter new password" 
//               />
//             </div>
//             <div className="button-profile">
//               <button type="button">Cancel</button>
//               <button type="submit">Save</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;

// import React, { useState, useRef, useEffect } from 'react';
// import './Profile.scss';
// import Upload from "./img/Upload.png";
// import Upload1 from './img/Upload1.png';
// import axios from 'axios';

// const ProfileUpdate = () => {
//   const [userData, setUserData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     state: '',
//     image: '',
   
    
//   });

//   const [user, setUser] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(Upload); // Default image
//   const inputRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userStr = localStorage.getItem('user');
//       const user = JSON.parse(userStr);
//       setUser(user);

//       if (user) {
//         try {
//           const response = await axios.get(`http://44.196.64.110:5001/api/user/${user}`);
//           const data = response.data.data;

//           setUserData(data);

//           // Set the imagePreview based on whether an image is present in the user data
//           if (data.image) {
//             setImagePreview(data.image); // Assuming `data.image` contains the image URL
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [id]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = canvasRef.current;
//           const context = canvas.getContext('2d');
//           const size = Math.min(img.width, img.height);

//           canvas.width = size;
//           canvas.height = size;
//           context.drawImage(
//             img,
//             (img.width - size) / 2,
//             (img.height - size) / 2,
//             size,
//             size,
//             0,
//             0,
//             size,
//             size
//           );

//           const dataURL = canvas.toDataURL('image/jpeg');
//           setImagePreview(dataURL);
//         };
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append('fullName', userData.fullName);
//     formData.append('email', userData.email);
//     formData.append('phoneNumber', userData.phoneNumber);
//     formData.append('state', userData.state);
//     if (selectedImage) {
//       formData.append('image', selectedImage);
//     }

//     try {
//       const response = await axios.put(`http://44.196.64.110:5001/api/user/${user}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('User data updated:', response.data);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       alert('Error updating profile. Please try again.');
//     }
//   };

//   const handleClickImage = (e) => {
//     e.stopPropagation();
//     inputRef.current.click();
//   };

//   return (
//     <div className="profile-update">
//       <div className="profile1">
//         <div className="image-section" onClick={handleClickImage}>
//           <img src={imagePreview} alt="Profile Preview" />
//           <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
//           <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
//         </div>
//         <div className="field-section">
//           <form className="profile-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name</label>
//               <input 
//                 type="text" 
//                 id="fullName" 
//                 value={userData.fullName}
//                 onChange={handleInputChange} 
//                 placeholder="Enter your full name" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
//               <input 
//                 type="email" 
//                 id="email" 
//                 value={userData.email}
//                 onChange={handleInputChange} 
//                 placeholder="Enter email" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
//               <input 
//                 type="tel" 
//                 id="phoneNumber" 
//                 value={userData.phoneNumber}
//                 onChange={handleInputChange} 
//                 placeholder="Enter Phone Number" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
//               <input 
//                 type="text" 
//                 id="state" 
//                 value={userData.state}
//                 onChange={handleInputChange} 
//                 placeholder="Enter your state" 
//               />
//             </div>
//             <div className="button-profile">
//               <button type="button">Cancel</button>
//               <button type="submit">Save</button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <hr style={{ width: "90%" }} />

//       <div className="profile2">
//         <div className="image-section">
//           <img src={Upload1} alt="Profile" />
//         </div>
//         <div className="field-section">
//           <form className="profile-form">
//             <div className="form-group">
//               <label htmlFor="currentPassword"><i className="fa-solid fa-lock"></i> Current Password </label>
//               <input 
//                 type="password" 
//                 id="currentPassword" 
//                 placeholder="Enter current password" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="newPassword"><i className="fa-solid fa-lock"></i> New Password </label>
//               <input 
//                 type="password" 
//                 id="newPassword" 
//                 placeholder="Enter new password" 
//               />
//             </div>
//             <div className="button-profile">
//               <button type="button">Cancel</button>
//               <button type="submit">Save</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;

import React, { useState, useRef, useEffect } from 'react';
import './Profile.scss';
import Upload from "./img/Upload.png";
import Upload1 from './img/Upload1.png';
import axios from 'axios';

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    state: '',
    image: '',
  });

  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(Upload); // Default image
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem('user');
      // const user = JSON.parse(userStr);
      setUser(user);

      if (user) {
        try {
          const response = await axios.get(`http://44.196.64.110:5001/api/user/${user}`);
          const data = response.data.data;

          setUserData(data);

          // Set the imagePreview based on whether an image is present in the user data
          if (data.image) {
            setImagePreview(data.image); // Assuming `data.image` contains the image URL
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          const size = Math.min(img.width, img.height);

          canvas.width = size;
          canvas.height = size;
          context.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );

          const dataURL = canvas.toDataURL('image/jpeg');
          setImagePreview(dataURL);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('fullName', userData.fullName);
    formData.append('email', userData.email);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('state', userData.state);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await axios.put(`http://44.196.64.110:5001/api/user/${user}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User data updated:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the current password from the API
      const response = await axios.get(`http://44.196.64.110:5001/api/user/${user}`);
      const storedPassword = response.data.data.password;
      console.log(storedPassword);
      

      if (currentPassword !== storedPassword) {
        setPasswordError('Current password is incorrect.');
        return;
      }

      if (newPassword === '') {
        setPasswordError('New password cannot be empty.');
        return;
      }

      // Update the password in the backend
      await axios.put(`http://44.196.64.110:5001/api/user/user/${user}/`, { newPassword: newPassword });

      console.log('Password updated successfully');
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    }
  };

  const handleClickImage = (e) => {
    e.stopPropagation();
    inputRef.current.click();
  };

  return (
    <div className="profile-update">
      <div className="profile1">
        <div className="image-section" onClick={handleClickImage}>
          <img src={imagePreview} alt="Profile Preview" />
          <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
        <div className="field-section">
          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="fullName"><i className="fa-solid fa-person"></i> Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                value={userData.fullName}
                onChange={handleInputChange} 
                placeholder="Enter your full name" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
              <input 
                type="email" 
                id="email" 
                value={userData.email}
                onChange={handleInputChange} 
                placeholder="Enter email" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber"><i className="fa-solid fa-phone"></i> Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                value={userData.phoneNumber}
                onChange={handleInputChange} 
                placeholder="Enter Phone Number" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="state"><i className="fa-solid fa-location-dot"></i> State</label>
              <input 
                type="text" 
                id="state" 
                value={userData.state}
                onChange={handleInputChange} 
                placeholder="Enter your state" 
              />
            </div>
            <div className="button-profile">
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>

      <hr style={{ width: "90%" }} />

      <div className="profile2">
        <div className="image-section">
          <img src={Upload1} alt="Profile" />
        </div>
        <div className="field-section">
          <form className="profile-form" onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword"><i className="fa-solid fa-lock"></i> Current Password </label>
              <input 
                type="password" 
                id="currentPassword" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword"><i className="fa-solid fa-lock"></i> New Password </label>
              <input 
                type="password" 
                id="newPassword" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password" 
              />
            </div>
            {passwordError && <p className="error">{passwordError}</p>}
            <div className="button-profile">
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
  