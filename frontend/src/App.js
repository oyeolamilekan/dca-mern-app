import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages';
import SignIn from './pages/sign_in';

function App() {
  return (
    <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/sign_in' element={<SignIn />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
