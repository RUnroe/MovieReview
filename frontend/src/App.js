import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import MovieLanding from './components/MovieLanding';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<MovieLanding />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/details' element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
