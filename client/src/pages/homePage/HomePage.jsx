
import HSTU from "../../assets/pictures/hstu.png"
import HomeSlider from '../../components/homeSlider/HomeSlider';
import { useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";
import './homePage.css'

const HomePage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    })
    return (
       <>
         {loading ? (
                <div className="loader">
                    <BeatLoader color={"#36d7b7"} loading={loading} size={15} />
                </div>
            ) :
            (
                <div className="min-height">
                <div className='home'>
                        <div>
                            <div className="slider">
                                <div className="header">
                                    <img src={HSTU} className="hstu-logo" alt="" />
                                    <h1 className='mb-3 header-text'>Hajee Mohammad Danesh Science and Technology University Alumni Association (HSTUAA)</h1>
                                </div>
                                <div className='slider-image'><HomeSlider /></div>
                            </div>
                        </div>
                </div>
                <div className="container home-text">
                    An alumni association is an organization that serves as a bridge between a university or educational institution and its former students, or alumni. These associations play a crucial role in fostering lifelong connections between graduates, the university, and the student body. 
    
                    The HSTU Alumni Association (HSTUAA) stands as the official hub for over 400,00 HSTU alumni worldwide.The mission of the HSTU Alumni Association is to serve the diverse population of HSTU alumni worldwide, maintaining their connection to HSTU through active engagement designed to catalyze participation as volunteers, philanthropists, and ambassadors to and for HSTU.
    
                    While your time as a student may be in the past, HSTU, together with HSTUAA, remains your unwavering constant. Remember, the vast HSTU alumni community is your community. Your ties to this esteemed institution are enduring, and your involvement in his expansive network is a testament to the legacy of HSTU.
                </div>
             </div>
            )}
       </>
    );
};

export default HomePage;