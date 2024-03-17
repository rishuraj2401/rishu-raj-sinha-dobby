import React, { useContext } from 'react';
import ImageUpload from './ImageUpload';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import { AuthContext } from '../components/usercontext/userContext';
import SearchImage from '../components/Image/SearchImage';
// import SearchImage from './SearchImage';

function Home() {
  const navigate=useNavigate();
  const {user}=useContext(AuthContext)
  return (
    <div className="home">
      {user?
      <SearchImage/>:(<Login/>)
      }
    </div>
  );
}

export default Home;
