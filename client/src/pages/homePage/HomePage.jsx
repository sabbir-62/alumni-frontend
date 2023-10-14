
import HSTU from "../../assets/pictures/hstu.png"
import HomeSlider from '../../components/homeSlider/HomeSlider';
import './homePage.css'

const HomePage = () => {
    return (
       <>
            <div className='home'>
                <div className="slider">
                    <div className="header">
                        <img src={HSTU} className="hstu-logo" alt="" />
                        <h1 className='mb-3 header-text'>Hajee Mohammad Danesh Science and Technology University Alumni Association</h1>
                    </div>
                    <div className='slider-image'><HomeSlider /></div>
                </div>
            </div>
       </>
    );
};

export default HomePage;