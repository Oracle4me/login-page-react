import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import HomePages from './pages/HomePages';
import Alert from './components/Alert';
import ForgotPass from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
