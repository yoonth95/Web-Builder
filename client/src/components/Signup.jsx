import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import 'styles/login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const submitBtn = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '' || id === '' || pw === '') {
      alert('이름, 아이디, 비밀번호는 필수 입력입니다.');
      return;
    } else if (!emailRegex.test(id)) {
      alert('이메일 형식으로 입력해주시기 바랍니다.');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ userName: name, userID: id, userPW: pw }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data);
        setName('');
        setId('');
        setPw('');
        return;
      }

      alert('회원가입 성공');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='login'>
      <div className='login_main'>
        <img
          className='logo'
          src={logo}
          alt='로고 이미지'
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <form className='login_form' onSubmit={submitBtn}>
          <div className='inputTag'>
            <input
              type='text'
              id='input_name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='input_name'>
              Name <span style={{ color: '#EF4565' }}>*</span>
            </label>
          </div>
          <div className='inputTag'>
            <input
              type='text'
              id='input_id'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor='input_id'>
              Email <span style={{ color: '#EF4565' }}>*</span>
            </label>
          </div>
          <div className='inputTag'>
            <input
              type='password'
              id='input_pw'
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <label htmlFor='input_pw'>
              Password <span style={{ color: '#EF4565' }}>*</span>
            </label>
          </div>
          <button id='login_btn' type='submit'>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
