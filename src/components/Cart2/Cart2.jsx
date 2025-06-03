import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart2.scss';
import Group3 from './img/Group3.png';
import Popup from '../Popup/Popup';
import { useNavigate, useSearchParams } from 'react-router-dom';

const determineSeason = (month) => {
    if (month >= 0 && month <= 2) return 'peakseason'; // Jan - March
    if (month >= 3 && month <= 8) return 'offseason';  // April - Sept
    return 'secondaryseason';                          // Oct - Dec
};

const calculateDayDifference = (pickupDate, dropoffDate) => {
    const dayDifference = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
    const dayWords = {
        1: 'oneDay',
        2: 'twoDay',
        3: 'threeDay',
        4: 'fourDay',
        5: 'fiveDay',
        6: 'sixDay',
        7: 'sevenDay',
    };
    return dayDifference <= 7 ? dayWords[dayDifference] || 'seven' : 'sevenDay';
};

const fetchVehicledata = async (season, day, setCardDetails, setError) => {
    try {
        const response = await axios.get('http://44.196.64.110:8132/api/vehicle/by-season-and-day', {
            params: { season, day },
        });
        if (response.data?.length > 0) {
            setCardDetails(response.data);
            
        } else {
            setError('No vehicles available for the selected date and season.');
        }
    } catch (error) {
        setError('Error fetching vehicle details');
        console.log('Error fetching details:', error);
    }
};

const changecartstatus = async (id, status) => {
    try {
        // await axios.put(`http://44.196.64.110:5001/api/vehicle/changestatus/${id}`, { status });
    } catch (error) {
        console.log('Error changing Status', error);
    }
};

const Card = ({ image, passengers, model, price, id, status, onChoose }) => {
    const imageUrl = image ? `${image}` : Group3;
    return (
        <div className="card-cart2">
            <img src={imageUrl || Group3} alt={`${model} image`} className="card-image" />
            <div className="card-content">
                <p className="passengers">{passengers}  </p>
                <div className="manage">
                    <h2 className="model">{model}</h2>
                    <p className="price">Price <span>$ {price}</span></p>
                </div>
                <button
                    onClick={() => onChoose(id, status)}
                    className="choose-button"
                >
                    Choose this cart
                </button>
            </div>
        </div>
    );
};

const CardList = ({ cardDetails, onChoose }) => {
    return (
        <div className="card-list">
            {cardDetails.length > 0 ? (
                cardDetails.map((card, index) => {
                    const { image, passenger, vname, price, _id, Addtocart } = card;
                    return (
                        <Card
                            key={index}
                            image={image}
                            passengers={passenger}
                            model={vname}
                            price={price}
                            id={_id}
                            status={Addtocart}
                            onChoose={onChoose}
                        />
                    );
                })
            ) : (
                <p>No vehicles available</p>
            )}
        </div>
    );
};

const Cart2 = () => {
    const [cardDetails, setCardDetails] = useState([]);
    const [error, setError] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [reservationDate, setReservationDate] = useState(null);
    const [season, setSeason] = useState('');  // New state for season
    const [day, setDay] = useState('');        // New state for day
    const [filteredCards, setFilteredCards] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    useEffect(() => {
        const reservationId = localStorage.getItem('reservationId');
        if (reservationId) {
            axios.get(`http://44.196.64.110:5001/api/reserve/reservation/${reservationId}`)
                .then(response => {
                    const reservationData = response.data;
                    if (reservationData && reservationData.pickdate && reservationData.dropdate) {
                        const pickupDate = new Date(reservationData.pickdate);
                        const dropoffDate = new Date(reservationData.dropdate);
                        setReservationDate({ pickupDate, dropoffDate });
                    } else {
                        setError('Reservation data is missing pickdate or dropdate.');
                    }
                })
                .catch(err => {
                    setError('Error fetching reservation data');
                    console.log('Error fetching reservation data:', err);
                });
        } else {
            setError('No reservation ID found');
        }
    }, []);

    useEffect(() => {
        if (reservationDate) {
            const { pickupDate, dropoffDate } = reservationDate;

            // Determine season and day
            const currentSeason = determineSeason(pickupDate.getMonth());
            const currentDay = calculateDayDifference(pickupDate, dropoffDate);

            setSeason(currentSeason);
            setDay(currentDay);

            // Fetch vehicles data
            fetchVehicledata(currentSeason, currentDay, (fetchedData) => {
                const storedPassengerValue = searchParams.get('passenger'); // Retrieve passenger value

                // Filter vehicles based on passenger value
                const filtered = fetchedData.filter(
                    (card) => card.passenger === storedPassengerValue
                );

                // Set filtered and full vehicle lists
                setFilteredCards(filtered); // Filtered list
                setCardDetails(fetchedData); // Full list for "View All"
            }, setError);
        }
    }, [reservationDate]);



    const initialCardCount = 5;
    const handleToggle = () => {
        setShowAll(!showAll);
    };

    const handleChoose = (id, status) => {
        localStorage.setItem('vehicleId', id);
        console.log('vehicleId', id);

        changecartstatus(id, status);
        setSelectedCard(id);
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };

    const handleBookClick = () => {
        const reserveId = localStorage.getItem('reservationId');
        const vehicleId = localStorage.getItem('vehicleId');
        if (reserveId) {
            setPopupVisible(false);
            navigate(`/reserve?vehicleId=${vehicleId}`, { state: { season, day, vehicleId } });  // Use season and day from state
            localStorage.removeItem('price');

        } else {
            navigate('/home3');
        }
    };

    return (
        <div className="App">
            {error && <p className="error-message">{error}</p>}
            {isPopupVisible && <Popup onClose={handlePopupClose} onBook={handleBookClick} />}
            <CardList
                cardDetails={showAll ? cardDetails : filteredCards.slice(0, initialCardCount)}
                onChoose={handleChoose}
            />
         <div className="btn" style={{ display: 'flex', alignItems: 'center' }}>
                <button className="see-all" onClick={handleToggle}>
                    {showAll ? 'View Less' : 'View More'} ➔
                </button>
            </div>
        </div>
    );
};

export default Cart2;
