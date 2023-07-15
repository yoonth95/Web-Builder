import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';

import logo from 'assets/images/logo.svg';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();

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
        return;
      }

      const userInfo = {
        user_id: data.user_id,
        user_name: data.user_name,
      };

      dispatch(setUser(userInfo));
      alert('로그인 성공');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <img src={logo} alt='로고 이미지' />
      <form onSubmit={submit}>
        <input
          type='text'
          placeholder='아이디 입력'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type='password'
          placeholder='비밀번호 입력'
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
