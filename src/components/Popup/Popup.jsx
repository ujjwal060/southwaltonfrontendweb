// import React from 'react';
// import './Popup.scss'; // Create a separate CSS file for popup styles

// const Popup = ({ onClose, onBook }) => {
//     return (
//         <div className="popup-overlay">
//             <div className="popup-content">
//                 <p>Cart Added!</p>
//                 <div className="popup-buttons">
//                     <button onClick={onClose} className="popup-button">OK</button>
//                     <button onClick={onBook} className="popup-button">Book</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Popup;
import React from 'react';
import './Popup.scss'; // Ensure this is the correct path to your SCSS file

const Popup = ({ onClose, onBook }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button onClick={onClose} className="close-button">&times;</button>
                <p>Cart Added!</p>
                <div className="popup-buttons">
                    <button onClick={onBook} className="popup-button">Reserve</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
