import React from 'react';
import './Model.css'; 

const Modal = ({ onClose, onSignUp }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Welcome! Let's get started.</h2>
                <p>It looks like you're new here. Would you like to create an account?</p>
                <button onClick={onSignUp}>Create Account</button>
                <button onClick={onClose}>Skip</button>
            </div>
        </div>
    );
};

export default Modal;
