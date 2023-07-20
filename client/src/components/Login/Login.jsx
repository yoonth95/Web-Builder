import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import logo from 'assets/images/logo.svg';
import 'styles/Login/Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (id === '' || pw === '') {
      alert('아이디 또는 비밀번호를 입력해주시기 바랍니다.');
      return;
    } else if (!emailRegex.test(id)) {
      alert('이메일 형식으로 입력해주시기 바랍니다.');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userID: id, userPW: pw }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data);
        setId('');
        setPw('');
        return;
      }

      const userInfo = {
        user_id: data.user_id,
        user_name: data.user_name,
      };

      dispatch(setUser(userInfo));
      alert('로그인 성공');
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='login'>
      <div className='login_main'>
        <img className='logo' src={logo} alt='로고 이미지' />
        <form className='login_form' onSubmit={submit}>
          <div className='inputTag'>
            <input type='text' id='input_id' value={id} onChange={(e) => setId(e.target.value)} />
            <label htmlFor='input_id'>
              Email <span style={{ color: '#EF4565' }}>*</span>
            </label>
            {/* <span className='validation'>등록되지 않은 이메일 주소입니다.</span> */}
          </div>
          <div className='inputTag'>
            <input type='password' id='input_pw' value={pw} onChange={(e) => setPw(e.target.value)} />
            <label htmlFor='input_pw'>
              Password <span style={{ color: '#EF4565' }}>*</span>
            </label>
            {/* <span className='validation'>비밀번호가 일치하지 않습니다.</span> */}
          </div>
          <div className='link_box'>
            <Link to='/signup'>계정 만들기</Link>
            <Link to='#'>비밀번호를 잊어버리셨나요?</Link>
          </div>
          <button id='login_btn' type='submit'>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
