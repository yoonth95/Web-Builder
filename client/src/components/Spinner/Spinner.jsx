import React from 'react';
import logo from 'assets/images/logo.svg';
import 'styles/Spinner/Spinner.css';

const Spinner = () => {
  return (
  <div class="loading-spinner">
    <img src={logo} alt="로고"/>
  </div>
  );
};

export default Spinner;