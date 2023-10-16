import {Routes, Route} from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/homePage/HomePage';
import MyAccount from './pages/myAccount/MyAccount';
import ContactPage from './pages/contactPage/ContactPage';
import LoginPage from './pages/loginPage/LoginPage';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import ErrorPage from './pages/errorPage/ErrorPage'
import Logout from './pages/logoutPage/Logout';
import NewsPage from './pages/newsPage/NewsPage'
import GraduateList from './pages/listOfGraduates/GraduateList';
import GalleryPage from './pages/galleryPage/GalleryPage';
import EventPage from './pages/eventsPage/EventPage';






function App() {
  return (
   <>
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
   </>
  )     
}

export default App;





