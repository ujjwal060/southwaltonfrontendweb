import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import homebg1 from './img/homebg1.png';
import Group from './img/Group.png';
import './Reserve.scss';

const Reserve = () => {
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const [reservationDates, setReservationDates] = useState(null);
    const [searchParams] = useSearchParams();
    const canvasRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { season, day, vehicleId } = location.state || {};
    const [reservationId, setReservationId] = useState('');
    const [calcPrice, setCalcPrice] = useState('');
    // const reservationId = searchParams.get('reservationId');
    // const [searchParams] = useSearchParams();

    useEffect(() => {
        const storedReservationId = localStorage.getItem('reservationId'); // Retrieve the value
        setReservationId(storedReservationId); // Update state with the retrieved value
    }, []);


    // Helper function to format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Fetch vehicle details
    useEffect(() => {
        if (vehicleId && season && day) {
            fetch(`http://44.196.64.110:8132/api/vehicle/price/${vehicleId}?season=${season}&day=${day}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setVehicleDetails(data);
                    // if (data?.price) {
                    //     localStorage.setItem('price', data.price);
                    // }
                })
                .catch(error => console.error('Error fetching vehicle details:', error));
        }
    }, [vehicleId, season, day]);

    // Fetch reservation dates
    useEffect(() => {
        if (reservationId) {
            fetch(`http://44.196.64.110:5001/api/reserve/reservation/${reservationId}`)
                .then(response => response.json())
                .then(data => setReservationDates(data))
                .catch(error => console.error('Error fetching reservation dates:', error));
        }
    }, [reservationId]);

    // Calculate price and store in localStorage
    useEffect(() => {
        if (vehicleDetails && reservationDates) {
            const calculatedPrice = vehicleDetails.price * reservationDates.days;
            setCalcPrice(calculatedPrice);
        }
    }, [vehicleDetails, reservationDates]);

    // Update canvas with vehicle image
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();

        const canvasWidth = 300;
        const canvasHeight = 200;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        image.src = vehicleDetails?.image || Group;
        image.onload = () => {
            const aspectRatio = image.width / image.height;
            let renderWidth, renderHeight, offsetX, offsetY;

            if (aspectRatio > canvasWidth / canvasHeight) {
                renderWidth = canvasWidth;
                renderHeight = renderWidth / aspectRatio;
                offsetX = 0;
                offsetY = (canvasHeight - renderHeight) / 2;
            } else {
                renderHeight = canvasHeight;
                renderWidth = renderHeight * aspectRatio;
                offsetX = (canvasWidth - renderWidth) / 2;
                offsetY = 0;
            }

            // Clear canvas and draw the image
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
        };
    }, [vehicleDetails]);

    const handleCheckoutClick = async () => {
        if (!vehicleId || !reservationId) {
            alert("Vehicle ID or Reservation ID is missing.");
            return;
        }

        try {
            const response = await fetch(`http://44.196.64.110:5001/api/reserve/reservation/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vehicleId, reserveAmount: calcPrice }),

            });

            console.log(response, "response-----");

            if (response.ok) {
                const reservationId = localStorage.getItem('reservationId');
                const storedVehicleId = localStorage.getItem('vehicleId');
                const token = localStorage.getItem('token');
                if (reservationId && storedVehicleId && token) {
                    navigate(`/checkout?vehicleId=${storedVehicleId}`);
                } else{
                    navigate(`/login`);
                }
                localStorage.removeItem("price");
            } else {
                console.error('Failed to update reservation:', response.statusText);
                alert('Failed to update the reservation. Please try again.');
            }
        } catch (error) {
            console.error('Error in handleCheckoutClick:', error);
            alert(`An unexpected error occurred: ${error.message}`);
        }
    };

    return (
        <div className='Reserve'>
            <img className='aa' src={homebg1} alt="" />
            <div className='week'>
                <div className='weekName'>
                    <canvas ref={canvasRef}></canvas>
                </div>
                <div className='week2'>
                    {vehicleDetails && (
                        <>
                            <h3>
                                {vehicleDetails.vname || 'Vehicle Name'}
                                &nbsp;<span>{`${vehicleDetails.passenger || '4'} `}</span>
                            </h3>
                            <h4>
                                Price: <span>${vehicleDetails.price}</span>
                            </h4>
                        </>
                    )}
                    {reservationDates && (
                        <>
                            <p>
                                Start Date: <span>{formatDate(reservationDates.pickdate)}</span>
                            </p>
                            <p>
                                End Date: <span>{formatDate(reservationDates.dropdate)}</span>
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className='book'>
                <button onClick={handleCheckoutClick}>
                    Request Booking
                </button>
            </div>
        </div>
    );
};

export default Reserve;
