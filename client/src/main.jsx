
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './main.css';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';


const rootElement = document.getElementById('root');


ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <>
         <Navbar />
         <App />
         <Footer />
    </>
  </BrowserRouter>
);