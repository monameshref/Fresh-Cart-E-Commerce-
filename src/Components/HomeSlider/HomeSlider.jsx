import React from "react";
import Slider from "react-slick";

export default function HomeSlider() {
    var settings = {
        // dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return <>
        <Slider {...settings} className="HomeSlider">
            <div>
                <figure>
                    <img src={require("../../assets/images/slider/slider-4.jpeg")} style={{height:"400px"}} className="w-100" alt="" />
                </figure>
            </div>
            <div>
                <figure>
                    <img src={require("../../assets/images/slider/slider-3.jpeg")} style={{height:"400px"}} className="w-100" alt="" />
                </figure>
            </div>
        </Slider>
    </>
}