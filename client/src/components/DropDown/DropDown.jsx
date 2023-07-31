import React, { useEffect, useState } from 'react';
import 'styles/DropDown/DropDown.css';

const Dropdown = ({ visibility, children }) => {
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

  return <article className={`${visibility ? 'dropdown' : 'dropup'}`}>{visibilityAnimation && children}</article>;
};

export default Dropdown;
