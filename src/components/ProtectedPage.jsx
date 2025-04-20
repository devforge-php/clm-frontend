import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const navigate = useNavigate();  // useHistory o'rniga useNavigate ishlatish
  
  useEffect(() => {
    const userRole = localStorage.getItem('role'); // 'role' localStorage'dan olinadi
    
    if (!userRole || (userRole !== 'admin' && userRole !== 'user')) {
      navigate('/login');  // Agar role bo'lmasa yoki noto'g'ri ro'l bo'lsa, login sahifasiga yo‘naltirish
    }
  }, [navigate]);   

  return (
    <div>
      {/* Boshqa sahifa kontenti */}
    </div>
  );
};

export default ProtectedPage;
