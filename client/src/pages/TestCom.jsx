import React,{ useState,useEffect } from 'react';
import Nav from "components/Main/Nav"

const TestCom = ({isLoading , setIsLoading}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <>
            <Nav isLoading={isLoading} setIsLoading={setIsLoading} windowWidth={windowWidth} />
        </>
    );
};

export default TestCom;