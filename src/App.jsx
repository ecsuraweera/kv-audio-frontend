import './App.css';
import AdminPage from './pages/admin/adminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import Testing from './components/test.jsx';
import LoginPage from './pages/Login/login';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/register/register';




function App() {
    return (
    <BrowserRouter>
    <Toaster position='top-right'/>
        <Routes path="/*">
            <Route path="/testing" element={<Testing/>}/>
            <Route path="/admin/*" element={<AdminPage />}/>
            <Route path="/*" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>

    </BrowserRouter>
    );
}

export default App
