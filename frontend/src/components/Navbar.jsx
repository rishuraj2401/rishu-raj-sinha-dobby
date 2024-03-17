import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { AuthContext } from './usercontext/userContext';
import { removeToken } from '../utils/auth';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user,setUser } = useContext(AuthContext); 
  const navigate= useNavigate() 
  const handleLogout=()=>{
    removeToken(); 
    setUser('')
    navigate("/")
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="text-white font-semibold text-2xl ">
          <Link href="/"> Image.com</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden text-white " onClick={toggleMobileMenu}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user?(<> <Link to='/upload'  className="text-white">UploadImages</Link>
          <Link to="/"  className="text-white">
            <button type="button" onClick={handleLogout}>Logout</button>
          </Link></>):(<> <Link to='/login'  className="text-white">Login</Link>
          <Link to="/signup" className="text-white">
            Signup
          </Link></>)}
         

        
        </div>

        {/* Mobile Menu - Visible on Small Screens */}
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black">
          {user?(<><Link
            to="/login"
            target="_blank"
            className="block py-2 px-4 text-white"
          >
            UploadImages
          </Link>
          <Link to="/signup" className="block py-2 px-4 text-white">Logout
          </Link></>):(<><Link
            to="/login"
            target="_blank"
            className="block py-2 px-4 text-white"
          >
            Login
          </Link>
          <Link to="/signup" className="block py-2 px-4 text-white">
            Signup
          </Link></>)}

          
        
        </div>
      )}
    </nav>
  );
};

export default Navbar;
