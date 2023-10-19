import { useEffect, useState } from 'react'
import ari_building from '../../assets/pictures/galleryImages/agriculture-building.jpg'
import exam from '../../assets/pictures/galleryImages/exam.jpg'
import hstu_brac from '../../assets/pictures/galleryImages/hstu-brac-mou.jpg'
import hstu_sm from '../../assets/pictures/galleryImages/hstu-sm.jpg'
import hstu from '../../assets/pictures/galleryImages/hstu.jpg'
import hstu1 from '../../assets/pictures/galleryImages/hstu1.jpg'
import hstu2 from '../../assets/pictures/galleryImages/hstu2.jpg'
import hstu3 from '../../assets/pictures/galleryImages/hstu3.jpg'

import { BeatLoader } from "react-spinners";

import './galleryPage.css'

const GalleryPage = () => {
    const [loading, setLoading] =useState(true)
    useEffect(() =>{
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [])

    return (
        <div>
            {
                loading ?
                (
                    <div className="loader">
                      <BeatLoader
                        color={"#36d7b7"}
                        loading={loading}
                        size={15}
                      />
                    </div>
                  )
                  :
                <div className="gallery min-height">
                    <div className="gallery__item gallery__item--1">
                        <img src={ari_building} className="gallery__img" alt="Image 1" />
                    </div>
                    <div className="gallery__item gallery__item--2">
                        <img src={exam} className="gallery__img" alt="Image 2" />
                    </div>
                    <div className="gallery__item gallery__item--3">
                        <img src={hstu_brac} className="gallery__img" alt="Image 3" />
                    </div>
                    <div className="gallery__item gallery__item--4">
                        <img src={hstu_sm} className="gallery__img" alt="Image 4" />
                    </div>
                    <div className="gallery__item gallery__item--5">
                        <img src={hstu} className="gallery__img" alt="Image 5" />
                    </div>
                    <div className="gallery__item gallery__item--6">
                        <img src={hstu1} className="gallery__img" alt="Image 6" />
                    </div>
                    <div className="gallery__item gallery__item--6">
                        <img src={hstu2} className="gallery__img" alt="Image 6" />
                    </div>
                    <div className="gallery__item gallery__item--6">
                        <img src={hstu3} className="gallery__img" alt="Image 6" />
                    </div>
                </div>
            }
        </div>
    );
};

export default GalleryPage;