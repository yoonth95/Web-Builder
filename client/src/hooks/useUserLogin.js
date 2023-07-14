import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';

const useUserLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/api/verifyToken', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        setIsLogin(data.isLogin);
        const userInfo = {
          user_id: data.user.userID,
          user_name: data.user.userName,
        };
        dispatch(setUser(userInfo));
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  return isLogin;
};

export default useUserLogin;
