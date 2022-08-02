import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfirmLogin from './pages/confirm_login';
import SignIn from './pages/sign_in';
import DashBoard from './pages/dashboard';

function App() {
  return (
    <Router>
        <div className='container'>
          <Routes>
            <Route path='/sign_in' element={<SignIn />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/confirm_login' element={<ConfirmLogin />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
