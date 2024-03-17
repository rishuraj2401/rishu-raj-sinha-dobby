import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './components/Auth/Login';
// import Signup from '';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import SearchImage from './components/Image/SearchImage';
import { auth } from './utils/api';
import ImageUpload from './pages/ImageUpload';
// import axios from 'axios';

function App() {
  // const [user,setUser]=useState('')
 
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Routes>
          <Route path='/upload' element={<ImageUpload/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes> <Routes>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
        {/* <Routes>
          <Route path='/search' element={<SearchImage/>}/>
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;
