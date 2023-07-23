import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { verifyTokenAPI } from 'api/User';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userInfo = await verifyTokenAPI(); // Modify this line
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