import React from 'react';
import { useLocation } from 'react-router-dom';

const Modal = ({ isOpen }) => {
    const location = useLocation();
    if (isOpen) {
        console.log(location);
    }

    return (
        <div>
            
        </div>
    );
};

export default Modal;