import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src="https://i.ibb.co.com/F2hjrRf/Green-Watercolour-Opening-Soon-Banner.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/cXg7w3rq/Black-and-White-Minimalist-Elegant-Fashion-Banner.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/G4518Nm0/Black-Red-Minimalist-Fashion-Product-Introduction-Landscape-Banner.png" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;