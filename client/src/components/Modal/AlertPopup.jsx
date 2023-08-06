import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from 'redux/AlertSlice';

import './AlertPopup.css';

const AlertPopup = () => {
    const dispatch = useDispatch();
    const { message, showAlert } = useSelector(state => state.alert);
    console.log(showAlert)

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(hideAlert());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    return (
        <>
            {showAlert&&<div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 99999, 
                }}
            >
                <div
                    style={{
                        animation: showAlert ? 'fadeInOut 2s forwards' : '', // 2초 동안 애니메이션
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        padding: '10px 20px',
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '5px',
                        zIndex: 1000,
                    }}
                >
                    {message}
                </div>
            </div>}
        </>
    );
};

export default AlertPopup;