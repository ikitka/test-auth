import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import { observer } from 'mobx-react-lite';
import { authStore } from './stores/authStore';

const App = observer(() => {
  return (
    <Router>
      <nav>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        <Link to="/users" style={{ marginRight: '10px' }}>User List</Link>
        {authStore.accessToken && <button onClick={() => authStore.logout()} style={{ marginRight: '10px' }}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
});

export default App;