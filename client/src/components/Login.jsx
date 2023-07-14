import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';

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

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      dispatch(setUser({ user_id: data.user_id, user_name: data.user_name }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
  );
};

export default Login;
