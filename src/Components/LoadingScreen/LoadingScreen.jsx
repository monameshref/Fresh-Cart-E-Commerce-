import React from 'react'
import freshcart from "../../assets/images/freshcart-logo.svg"
import { BallTriangle } from 'react-loader-spinner'

export default function LoadingScreen() {
    return <>
        <div className='LoadingScreen d-flex flex-column justify-content-center align-items-center vh-100 w-100 bg-white bg-opacity-50'>
        <BallTriangle
            height={60}
            width={60}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
            <figure className='w-100 text-center'>
                <img src={freshcart} className='pt-4' alt="freshcart" />
            </figure>
        </div>
    </>
}
