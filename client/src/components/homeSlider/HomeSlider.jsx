import pic1 from '../../assets/pictures/pic1.jpg'
import pic2 from '../../assets/pictures/pic2.jpg'
import pic3 from '../../assets/pictures/pic3.jpg'

import "./homeSlider.css"

const HomeSlider = () => {
    return (
        <div className="hero">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                <div className="carousel-item active slider-image-block">
                    <img src={pic1} className="d-block w-100 slider-image" alt="..." />
                </div>
                <div className="carousel-item slider-image-block">
                    <img src={pic2} className="d-block w-100 slider-image" alt="..." />
                </div>
                <div className="carousel-item slider-image-block">
                    <img src={pic3} className="d-block w-100 slider-image" alt="..." />
                </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default HomeSlider;