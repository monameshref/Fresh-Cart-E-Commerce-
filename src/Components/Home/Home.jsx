import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import Categories from '../Categories/Categories'
import Products from '../Products/Products'

export default function Home() {
    return <>
    <section className='home'>
        <div className="container py-5">
            <div className="row g-0 rounded">
                <div className="col-md-9">
                    <HomeSlider />
                </div>
                <div className="col-md-3">
                    <figure className='m-0'>
                        <img src={require("../../assets/images/slider/slider-1.jpeg")} style={{height:"200px"}} className="w-100" alt="" />
                    </figure>
                    <figure className='m-0'>
                        <img src={require("../../assets/images/slider/slider-2.jpeg")} style={{height:"200px"}} className="w-100" alt="" />
                    </figure>
                </div>
            </div>
            <Categories />
            <Products />
        </div>
    </section>
    </>
}
