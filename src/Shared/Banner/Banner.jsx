import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src="https://i.ibb.co.com/WvCM30nV/IMG-8156-psd-png.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/ccVNG3vk/IMG-8165.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/prkrgWYP/IMG-8166.jpg" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;