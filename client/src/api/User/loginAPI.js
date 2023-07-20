// import { setUser } from 'redux/userSlice';
// import { useDispatch } from 'react-redux';

// export const loginAPI = async (id, pw) => {
//   const dispatch = useDispatch();
//   try {
//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ userID: id, userPW: pw }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data);
//       setId('');
//       setPw('');
//       return;
//     }

//     const userInfo = {
//       user_id: data.user_id,
//       user_name: data.user_name,
//     };

//     dispatch(setUser(userInfo));
//     alert('로그인 성공');
//     navigate('/admin');
//   } catch (err) {
//     console.error(err);
//   }
// };
