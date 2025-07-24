import React from 'react';
import './Popup.scss';

const Popup = ({ onClose, onReserve, onBook }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button onClick={onClose} className="close-button">&times;</button>
                <p>Select if you want to reserve or book the cart!</p>
                <div className="popup-buttons d-flex justify-content-center gap-3 mt-3">
                    <button onClick={onReserve} className="popup-button btn btn-warning">
                        Reserve Cart
                    </button>
                    <button onClick={onBook} className="popup-button btn btn-success">
                        Book Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
