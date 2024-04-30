import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();
  let user = null;

  try {
    const userObject = JSON.parse(localStorage.getItem('persist:user'));
    user = userObject && userObject.userInfo ? JSON.parse(userObject.userInfo) : null;
  } catch (error) {
    console.error('Error parsing user info:', error);
  }

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      toast.error('Bạn không phải là admin, hãy đăng nhập');
    }
  }, [navigate, user]);

  return user && user.role === 'admin' ? children : null;
};

export default ProtectedComponent;