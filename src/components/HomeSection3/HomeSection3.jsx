// import React, { useState, useRef, useEffect } from 'react';
// import './HomeSection3.scss';

// const CartDetails = () => {
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [deliveryLocation, setDeliveryLocation] = useState('');
//     const [pickupLocation, setPickupLocation] = useState('');

//     const startDateRef = useRef(null);
//     const endDateRef = useRef(null); 
//     const deliveryRef = useRef(null);
//     const pickupRef = useRef(null);

//     const formatDate = (date) => {
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(date).toLocaleDateString(undefined, options);
//     };

//     const handleIconClick = (ref) => {
//         ref.current.click();
//     };

//     useEffect(() => {
//         const initAutocomplete = () => {
//             if (window.google && window.google.maps) {
//                 try {
//                     const deliveryAutocomplete = new window.google.maps.places.Autocomplete(deliveryRef.current, {
//                         types: ['address'],
//                     });
//                     deliveryAutocomplete.addListener('place_changed', () => {
//                         const place = deliveryAutocomplete.getPlace();
//                         setDeliveryLocation(place.formatted_address);
//                     });

//                     const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, {
//                         types: ['address'],
//                     });
//                     pickupAutocomplete.addListener('place_changed', () => {
//                         const place = pickupAutocomplete.getPlace();
//                         setPickupLocation(place.formatted_address);
//                     });
//                 } catch (error) {
//                     console.error('Error initializing Google Maps Autocomplete:', error);
//                 }
//             } else {
//                 console.error('Google Maps API is not loaded');
//             }
//         };

//         if (window.google && window.google.maps) {
//             initAutocomplete();
//         } else {
//             console.error('Google Maps API is not loaded yet');
//         }
//     }, []);

//     return (
//         <>
//             <div className="home3-header">
//                 <h1>CART DETAILS</h1>
//             </div>
//             <div className="home3-details">
//                 <div className="location-input">
//                     <div className="input-wrapper">
//                         <label><i className="fa-solid fa-location-dot"></i> Delivery</label>
//                         <input
//                             type="text"
//                             placeholder="Enter Your Delivery Location"
//                             ref={deliveryRef}
//                             value={deliveryLocation}
//                             onChange={(e) => setDeliveryLocation(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-wrapper">
//                         <label><i className="fa-solid fa-location-dot"></i> Pickup</label>
//                         <input
//                             type="text"
//                             placeholder="Enter Your Pickup Location"
//                             ref={pickupRef}
//                             value={pickupLocation}
//                             onChange={(e) => setPickupLocation(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="date-input">
//                     <div className="date-wrapper">
//                         <input
//                             type="date"
//                             className="date-box"
//                             id="startDate"
//                             ref={startDateRef}
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                         />
//                         <span className="placeholder">
//                             {startDate ? formatDate(startDate) : 'Start Date'}
//                             <span className="icon" onClick={() => handleIconClick(startDateRef)}>
//                                 <i className="fa-regular fa-calendar-days"></i>
//                             </span>
//                         </span>
//                     </div>
//                     <div className="date-wrapper">
//                         <input
//                             type="date"
//                             className="date-box"
//                             id="endDate"
//                             ref={endDateRef}
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                         />
//                         <span className="placeholder">
//                             {endDate ? formatDate(endDate) : 'End Date'}
//                             <span className="icon" onClick={() => handleIconClick(endDateRef)}>
//                                 <i className="fa-regular fa-calendar-days"></i>
//                             </span>
//                         </span>
//                     </div>
//                 </div>

//                 <div className="homesection3">
//                     <button className="search-btn">Submit</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CartDetails;
// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import './HomeSection3.scss';
// import { Autocomplete, useLoadScript } from '@react-google-maps/api';

// const libraries = ['places'];

// const CartDetails = () => {
//     const [deliveryLocation, setDeliveryLocation] = useState('');
//     const [pickupLocation, setPickupLocation] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     const deliveryRef = useRef(null);
//     const pickupRef = useRef(null);

//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M',
//         libraries,
//     });

//     const handlePlaceChanged = useCallback((field, ref) => {
//         if (ref.current) {
//             const place = ref.current.getPlace();
//             if (place) {
//                 const address = place.formatted_address || place.name; // Get either formatted address or place name
//                 if (field === 'delivery') {
//                     setDeliveryLocation(address);
//                 } else if (field === 'pickup') {
//                     setPickupLocation(address);
//                 }
//             }
//         }
//     }, []);

//     if (loadError) return <div>Error loading maps: {loadError.message}</div>;
//     if (!isLoaded) return <div>Loading Maps...</div>;

//     return (
//         <>
//             <div className="home3-header">
//                 <h1>CART DETAILS</h1>
//             </div>
//             <div className="home3-details">
//                 <div className="location-input">
//                     <div className="input-wrapper">
//                         <label><i className="fa-solid fa-location-dot"></i> Delivery</label>
//                         <Autocomplete
//                             onLoad={(ref) => deliveryRef.current = ref}
//                             onPlaceChanged={() => handlePlaceChanged('delivery', deliveryRef)}
//                         >
//                             <input
//                                 type="text"
//                                 placeholder="Enter Your Delivery Location"
//                                 value={deliveryLocation}
//                                 onChange={(e) => setDeliveryLocation(e.target.value)}
//                             />
//                         </Autocomplete>
//                     </div>
//                     <div className="input-wrapper">
//                         <label><i className="fa-solid fa-location-dot"></i> Pickup</label>
//                         <Autocomplete
//                             onLoad={(ref) => pickupRef.current = ref}
//                             onPlaceChanged={() => handlePlaceChanged('pickup', pickupRef)}
//                         >
//                             <input
//                                 type="text"
//                                 placeholder="Enter Your Pickup Location"
//                                 value={pickupLocation}
//                                 onChange={(e) => setPickupLocation(e.target.value)}
//                             />
//                         </Autocomplete>
//                     </div>
//                 </div>

//                 <div className="date-input">
//                     <div className="date-wrapper">
//                         <label><i className="fa-regular fa-calendar-days"></i> Start Date</label>
//                         <input
//                             type="date"
//                             className="date-box"
//                             id="startDate"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                         />
//                     </div>
//                     <div className="date-wrapper">
//                         <label><i className="fa-regular fa-calendar-days"></i> End Date</label>
//                         <input
//                             type="date"
//                             className="date-box"
//                             id="endDate"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                         />
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };

// export default CartDetails;
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './HomeSection3.scss';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const libraries = ['places'];

const CartDetails = () => {
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numOfDays, setNumOfDays] = useState(0);

    const deliveryRef = useRef(null);
    const pickupRef = useRef(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const passenger = searchParams.get('passenger');

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey:  import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const handlePlaceChanged = useCallback((field, ref) => {
        if (ref.current) {
            const place = ref.current.getPlace();
            if (place) {
                const address = place.formatted_address || place.name;
                field === 'delivery' ? setDeliveryLocation(address) : setPickupLocation(address);
            }
        }
    }, []);

    const calculateDaysBetween = useCallback((start, end) => {
        if (!start || !end) return 0;
        const startDateObj = new Date(start);
        const endDateObj = new Date(end);
        const differenceInTime = endDateObj - startDateObj;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays >= 0 ? differenceInDays : 0;
    }, []);

    useEffect(() => {
        const days = calculateDaysBetween(startDate, endDate);
        setNumOfDays(days);
    }, [startDate, endDate, calculateDaysBetween]);

    const handleFindCartClick = async () => {
        if (!pickupLocation || !deliveryLocation || !startDate || !endDate) {
            toast.error('Please fill all the fields!');
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            toast.error('End Date must be after Start Date.');
            return;
        }

        // const userId = localStorage.getItem('user');
        const data = {
            pickup: pickupLocation,
            drop: deliveryLocation,
            pickdate: startDate,
            dropdate: endDate,
            days: numOfDays.toString(),
            // userId,
        };

        try {
            const response = await fetch('http://44.196.64.110:5001/api/reserve/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to submit reservation');

            const result = await response.json();
            const { id } = result;

            if (id) {
                localStorage.setItem('reservationId', id);
                toast.success('Reservation successful!');
                navigate(`/cart?passenger=${passenger}`);
            } else {
                toast.error('Reservation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Please try again later.');
        }
    };

    if (loadError) return <div>Error loading maps: {loadError.message}</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <>
            <ToastContainer />
            <div className="kk">
                <div className="home3-header">
                    <u><h1>CART DETAILS</h1></u>
                </div>
                <div className="home3-details">
                    <div className="location-input">
                        <div className="input-wrapper">
                            <label><i className="fa-solid fa-location-dot"></i> Delivery</label>
                            <Autocomplete
                                onLoad={(ref) => (deliveryRef.current = ref)}
                                onPlaceChanged={() => handlePlaceChanged('delivery', deliveryRef)}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter Your Delivery Location"
                                    value={deliveryLocation}
                                    onChange={(e) => setDeliveryLocation(e.target.value)}
                                />
                            </Autocomplete>
                        </div>
                        <div className="input-wrapper">
                            <label><i className="fa-solid fa-location-dot"></i> Pickup</label>
                            <Autocomplete
                                onLoad={(ref) => (pickupRef.current = ref)}
                                onPlaceChanged={() => handlePlaceChanged('pickup', pickupRef)}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter Your Pickup Location"
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                />
                            </Autocomplete>
                        </div>
                    </div>

                    <div className="date-input">
                        <div className="date-wrapper">
                            <label><i className="fa-regular fa-calendar-days"></i> Start Date</label>
                            <input
                                type="date"
                                className="date-box"
                                value={startDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="date-wrapper">
                            <label><i className="fa-regular fa-calendar-days"></i> End Date</label>
                            <input
                                type="date"
                                className="date-box"
                                value={endDate}
                                min={startDate || new Date().toISOString().split('T')[0]}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="pp">
                    <button onClick={handleFindCartClick}>
                        <i className="fa-solid fa-magnifying-glass"></i> Find Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDetails;
