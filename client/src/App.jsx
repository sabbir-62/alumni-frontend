import { Routes, Route } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homePage/HomePage';
import MyAccount from './pages/myAccount/MyAccount';
import ContactPage from './pages/contactPage/ContactPage';
import LoginPage from './pages/loginPage/LoginPage';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import ErrorPage from './pages/errorPage/ErrorPage';
import Logout from './pages/logoutPage/Logout';
import NewsPage from './pages/newsPage/NewsPage';
import GraduateList from './pages/listOfGraduates/GraduateList';
import GalleryPage from './pages/galleryPage/GalleryPage';
import EventPage from './pages/eventsPage/EventPage';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from "react-spinners";

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Change loading state to false after 2000ms (2 seconds)
    }, 1000);
  }, []);

  return (
    <div className='app'>
      {loading ? (
        <div className="loader">
          <BeatLoader
            color={"#36d7b7"}
            loading={loading}
            size={15}
          />
        </div>
      ) : (
        <div className="app-container">
          <Navbar />
          <Routes>
              <Route exact path='/' element={<HomePage />}></Route>
              <Route exact path='/my-account' element={<MyAccount />}></Route>
              <Route exact path='/graduates-list' element={<GraduateList />}></Route>
              <Route exact path='/news' element={<NewsPage />}></Route>
              <Route exact path='/gallery' element={<GalleryPage />}></Route>
              <Route exact path='/events' element={<EventPage />}></Route>
              <Route exact path='/contact' element={<ContactPage />}></Route>
              <Route exact path='/login' element={<LoginPage />}></Route>
              <Route exact path='/registration' element={<RegistrationPage />}></Route>
              <Route exact path='/logout' element={<Logout />}></Route>
              <Route exact path='*' element={<ErrorPage />}></Route>
          </Routes>
          <Footer className="footer-app"/>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
          />
        </div>
      )}
    </div>
  );
}

export default App;





