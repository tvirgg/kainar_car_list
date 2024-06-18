'use client';

import React from 'react';
import Slider from 'react-slick';
interface PhotoGalleryProps {
    images: { image: string }[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        with: 500
    };

    return (
        <div className="photo-gallery">
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div key={index}>
                        <img src={img.image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PhotoGallery;
