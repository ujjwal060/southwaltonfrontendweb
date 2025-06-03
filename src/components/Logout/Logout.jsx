import React from 'react';
import './Logout.scss';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null; // Only render modal if isOpen is true

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Log Out</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="logout-btn" onClick={onLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
