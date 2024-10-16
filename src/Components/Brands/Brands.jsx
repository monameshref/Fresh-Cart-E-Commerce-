import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Brands() {

    async function getAllBrands(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    const {data,isLoading} = useQuery("getAllBrands",getAllBrands);
    const allBrands = data?.data.data;
    // console.log(allBrands);

    if (isLoading) {
        return <LoadingScreen />
    }

    return <>
            <Helmet>
                <title>FreshCart-Brands</title>
            </Helmet>
    <section>
        <div className="container py-5">
            <div className="row justify-content-center p-5 gy-3">
                { allBrands.map((brand)=>{ return (
                    <div key={brand._id} className="col-md-4 col-lg-3">
                        <Link to={`/BrandDetails/${brand._id}`}>
                                <div className="brand card shadow-sm cursor-pointer text-center p-2">
                                    <figure>
                                        <img src={brand.image} className='w-100' alt={brand.name} />
                                        <figcaption>
                                            <h5 className='fw-bold'>{brand.name}</h5>
                                        </figcaption>
                                    </figure>
                                </div>
                            {/* <h6>{brand._id}</h6> */}
                        </Link>
                    </div>
                ) }) }

                
            </div>
        </div>
    </section>
    </>
}
