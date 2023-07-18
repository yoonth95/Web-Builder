import React from 'react';
import { useLocation } from 'react-router-dom';
import 'styles/modal.css';


const Modal = ({ isOpen,setIsOpen }) => {
    const location = useLocation();
    if (isOpen) {
        console.log(location);
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleModalContentClick = (event) => {
        event.stopPropagation();
      };

    return (
        <>
        {isOpen && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={handleModalContentClick}>
                <button className="modal-close-btn" onClick={closeModal}>x</button>
              </div>
            </div>
          )}
        </>
    );
};

export default Modal;