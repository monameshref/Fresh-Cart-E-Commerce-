import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";
import Category from '../Category/Category';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Categories() {

    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const {data,isLoading} = useQuery("getAllCategories",getAllCategories);
    // console.log(data?.data.data);
    const allCategories = data?.data.data;

    if (isLoading) {
        return <LoadingScreen />
    }

    const settings = {
        // dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
            breakpoint: 1000,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
            {
            breakpoint: 767,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
            }
        },
            {
            breakpoint: 580,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
            }
        },
    
    
    ],
    };

    return <>
    <section>
        <div className="container py-5">
            <div className="row">
                <h2 className='h4 fw-bold pb-3'>Shop Popular Categories</h2>
                <Slider {...settings} className='cursor-pointer'>
                    { allCategories.map( (category) => { return <Category key={category._id} category={category} />})}
                </Slider>
            </div>
        </div>
    </section>
    </>
}
