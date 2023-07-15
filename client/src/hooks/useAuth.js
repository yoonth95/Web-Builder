import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/api/verifyToken', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          console.log('no token');
          return;
        }

        const data = await res.json();
        const userInfo = {
          user_id: data.user.userID,
          user_name: data.user.userName,
        };
        dispatch(setUser(userInfo));
        setLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [dispatch]);

  return { loading };
};

export default useAuth;
