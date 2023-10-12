import {Routes, Route} from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/homePage/HomePage';
import AboutPage from './pages/aboutPage/AboutPage';
import ContactPage from './pages/contactPage/ContactPage';
import LoginPage from './pages/loginPage/LoginPage';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import ErrorPage from './pages/errorPage/ErrorPage'
import Logout from './pages/logoutPage/Logout';






function App() {
  return (
   <>
    <Routes>
      <Route exact path='/' element={<HomePage />}></Route>
      <Route exact path='/about' element={<AboutPage />}></Route>
      <Route exact path='/contact' element={<ContactPage />}></Route>
      <Route exact path='/login' element={<LoginPage />}></Route>
      <Route exact path='/registration' element={<RegistrationPage />}></Route>
      <Route exact path='/logout' element={<Logout />}></Route>
      <Route exact path='*' element={<ErrorPage />}></Route>
    </Routes>
   </>
  )     
}

export default App;





