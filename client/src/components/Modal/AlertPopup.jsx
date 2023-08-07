import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert,hideConfirm, confirm ,cancel,showToast,updateProgress,hideToast} from 'redux/AlertSlice';

import './AlertPopup.css';

const AlertPopup = () => {
    const dispatch = useDispatch();
    const { message, showAlert, confirmMessage, cancelled, toastMessage, showToast, progress } = useSelector(state => state.alert);  

    // Alert 메시지에 대한 useEffect
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    // Confirm 메시지에 대한 useEffect
    useEffect(() => {
        if (cancelled) { 
                dispatch(hideConfirm());
        }
    }, [cancelled, dispatch]);  
    
    useEffect(() => {
        if (showToast) {
            let progress = 100;
            const decrement = 100 / (2.8 / 0.1);
            const timer = setInterval(() => {
                progress -= decrement;
                dispatch(updateProgress(progress)); 
                if (progress <= 0) {
                    clearInterval(timer);
                }
            }, 100);
            return () => clearInterval(timer);
        }
    }, [showToast, dispatch]);

    return (
        <>
            {showAlert&&<div className="popup-backdrop">
                <div className={showAlert ? "alert-message" : ""}>
                    {message}
                </div>
            </div>}
            {confirmMessage && (
    <div className="popup-backdrop">
        <div className="popup-content">
            <p className="popup-message">{confirmMessage}</p>
            <div className="popup-buttons">
                <button className="confirm-button" onClick={() => {
                        dispatch(confirm());
                        dispatch(hideConfirm()); 
                    }}>
                    확인
                </button>
                <button className="cancel-button" onClick={() => dispatch(cancel())}>취소</button>
            </div>
        </div>
    </div>
)}
{showToast&&<div className="popup-backdrop">
                <div className={showToast ? "toast-message" : ""}>
                    <p>{toastMessage}</p>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default AlertPopup;