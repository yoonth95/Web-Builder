// import React, { useEffect, useState } from 'react';
// import 'styles/DropDown/DropDown.css';

// const Dropdown = ({ visibility, children }) => {
//   const [visibilityAnimation, setVisibilityAnimation] = useState(false);
//   useEffect(() => {
//     if (visibility) {
//       setVisibilityAnimation(true);
//     } else {
//       setTimeout(() => {
//         setVisibilityAnimation(false);
//       }, 400);
//     }
//   }, [visibility]);

//   return <article className={`${visibility ? 'dropdown' : 'dropup'}`}>{visibilityAnimation && children}</article>;
// };

// export default Dropdown;


// import React, { useEffect, useState, useRef } from 'react';
// import 'styles/DropDown/DropDown.css';

// const Dropdown = ({ visibility, children }) => {
//   const [animationClass, setAnimationClass] = useState("");
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     if (visibility) {
//       setAnimationClass('dropdown');
//     } else {
//       setAnimationClass('dropup');
//     }
//   }, [visibility]);

//   const handleTransitionEnd = () => {
//     if (!visibility) {
//       setAnimationClass('');
//     }
//   };

//   return (
//     <article 
//       className={animationClass} 
//       ref={dropdownRef} 
//       onTransitionEnd={handleTransitionEnd}
//     >
//       {children}
//     </article>
//   );
// };

// export default Dropdown;

import React, { useEffect, useRef, useState } from 'react';
import 'styles/DropDown/DropDown.css';

const Dropdown = ({ visibility, children }) => {
  const dropdownRef = useRef(null);
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);

  useEffect(() => {
    if (visibility) {
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 400);
    }
  }, [visibility]);
  
// overflow hidden 제거
  useEffect(() => {
    const dropdown = dropdownRef.current;

    const handleAnimationStart = () => {
      dropdown.style.overflow = "hidden";
    };

    const handleAnimationEnd = () => {
      dropdown.style.overflow = "initial";
    };

    dropdown.addEventListener("animationstart", handleAnimationStart);
    dropdown.addEventListener("animationend", handleAnimationEnd);

    return () => {
      dropdown.removeEventListener("animationstart", handleAnimationStart);
      dropdown.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <article ref={dropdownRef} className={`${visibility ? 'dropdown' : 'dropup'}`}>
      {visibilityAnimation && children}
    </article>
  );
};

export default Dropdown;
