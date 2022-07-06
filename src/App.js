import './App.css';
import {Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import { UserProvider } from './contexts/userContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
        <UserProvider>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route exact path="/main" element={<ProtectedRoute linkToNavigate="/" />}>
              <Route exact path="/main" element={<MainScreen />} />
            </Route>
          </Routes>
        </UserProvider>
    </div>
  );
}

export default App;
