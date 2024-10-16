import React from 'react'
import style from '../../Components/Profile/Profile.module.css'
import ProfileImg from '../../assets/images/user-profile-icon.jpg'
import { Helmet } from 'react-helmet';

export default function Profile() {

    const userProfile = JSON.parse(localStorage.getItem('userData'));


    return <>
        <Helmet>
            <title>FreshCart-Profile</title>
        </Helmet>
        <section className={`profile ${style.profile}`}>
            <div className="container p-5">
                <div className="row w-75 m-auto ">
                    <figure className='text-center'>
                        <img src={ProfileImg} className='shadow border rounded-circle p-2 mb-3' alt="ProfileImage" />
                        <figcaption>
                            <h3>{userProfile.name}</h3>
                        </figcaption>
                    </figure>
                    <h5 className='h2'>Account Details</h5>
                    <form className='p-5 shadow bg-body-tertiary rounded'>
                        <label htmlFor="name" >Full Name</label>
                        <div className='group-input position-relative mb-3'>
                            <input type="text" name="name" id="name" className='form-control' disabled/>
                            <i className="fa-solid fa-user position-absolute icon"></i>
                            <p className='text-black-50 position-absolute'>{userProfile.name}</p>
                        </div>

                        <label htmlFor="email" >Email address</label>
                        <div className='group-input position-relative'>
                            <input type="email" name="email" id="email" className='form-control' disabled />
                            <i className="fa-solid fa-envelope icon position-absolute"></i>
                            <p className='text-black-50 position-absolute'>{userProfile.email}</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
}
