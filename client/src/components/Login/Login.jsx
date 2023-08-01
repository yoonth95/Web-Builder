import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { loginAPI } from 'api/User/loginAPI';
import useInputValues from 'hooks/useInput';
import 'styles/Login/Login.css';

const Login = () => {
  const { inputValues, handleChange, reset } = useInputValues({
    id: '',
    pw: '',
  });
  const { id, pw } = inputValues;
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
      const userInfo = await loginAPI(id, pw);
      dispatch(setUser(userInfo));
      alert('로그인 성공');
      navigate('/admin');
    } catch (err) {
      alert('로그인 실패');
      reset();
    }
  };

  return (
    <div className='admin'>
      <div className='login'>
        <div className='login_main'>
          <img className='logo' src="https://cache.wjthinkbig.com/WEB_RESOURCE/WJBOOKCLUB/images/layout_2023/logo.png" alt='로고 이미지' />
          <form className='login_form' onSubmit={submit}>
            <div className='inputTag'>
              <input type='text' id='input_id' name='id' value={id} onChange={handleChange} />
              <label htmlFor='input_id'>
                Email <span style={{ color: '#EF4565' }}>*</span>
              </label>
            </div>
            <div className='inputTag'>
              <input type='password' id='input_pw' name='pw' value={pw} onChange={handleChange} />
              <label htmlFor='input_pw'>
                Password <span style={{ color: '#EF4565' }}>*</span>
              </label>
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
    </div>
  );
};

export default Login;
