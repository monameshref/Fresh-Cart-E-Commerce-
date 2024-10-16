import React, { useEffect, useState } from 'react'
import resetPasswordImg from "../../assets/images/Reset-password-rafiki.svg"
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { Vortex } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function ResetPassword() {

    const [errMessage, setErrMessage] = useState(undefined);
    const [IsSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    //! Close & Open Button
    useEffect(function(){
        const passInputs = document.querySelectorAll(`input[type='password']`);
        const passIcon = document.querySelectorAll(".passIcon");
        const passBtn = document.querySelectorAll(".passBtn");
    
        for (let i = 0; i < passBtn.length; i++) {
            passBtn[i].addEventListener("click",function(){
            if( passInputs[i].type === "password") {
                passInputs[i].type = "text";
                passIcon[i].classList.remove("fa-eye-slash");
                passIcon[i].classList.add("fa-eye");
            }
            else {
                passInputs[i].type = "password";
                passIcon[i].classList.add("fa-eye-slash");
                passIcon[i].classList.remove("fa-eye");
            }
        });
        }
    },[]);

    const userData = {
    email:"",
    newPassword:""
    };

    async function resetPassword(values) {
        setIsLoading(true);
        const res = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
        .then((sucsess)=>{
            // console.log(sucsess);
            if (sucsess.data.token) {
                setIsSuccess(true);
                setIsSuccess("sucsess");
                    setTimeout(function(){
                        setIsSuccess(false);
                    },2000);
                    navigate("/login");
            }
        })
        .catch((error)=>{
            // console.log(error);
            setErrMessage(error.response.data.message);
                setTimeout(function(){
                    setErrMessage(undefined);
                },2000);
        })
        setIsLoading(false);
    }

    //! Validation Inputs By Yup
    const validationSchema = yup.object({
        email:yup.string().email("Please Enter an Email Must Be In Format").required("This Email Is Required"),
        newPassword:yup.string().required("This New Password Is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"New Password Minimum Eight Characters, at least One Letter and One Number"),
    });

    const formik = useFormik({
        initialValues: userData,
        onSubmit: resetPassword,
        validationSchema:validationSchema
    });

    return <>
        <Helmet>
            <title>FreshCart-ResetPassword</title>
        </Helmet>
    <section className='login'>
        <div className="container">
            <div className="row align-items-center py-5">
                <div className="col-md-5">
                    <figure>
                        <img src={resetPasswordImg} className='w-75' alt="resetPassword" />
                    </figure>
                </div>

                <div className="col-md-7">
                    <div className='shadow p-5 rounded bg-body-tertiary'>
                        <div className='title'>
                            <h2 className='fs-4 fw-bold'>Reset Password</h2>
                            {/* <p className='text-black-50'>Welcome back to FreshCart! Enter your email to get started.</p> */}
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' placeholder='Email' className='form-control input-focuc mt-3' />
                            { formik.errors.email && formik.touched.email ?
                                <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.email}
                                </div> : "" }

                            <div className='position-relative'>
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name='newPassword' placeholder='New Password' className='form-control input-focuc mt-3' />
                                <span className='passBtn position-absolute cursor-pointer'>
                                    <i className="fa-solid fa-eye-slash passIcon"></i>
                                </span>
                            </div>
                            { formik.errors.newPassword && formik.touched.newPassword ?
                                <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                    {formik.errors.newPassword}
                                </div> : "" }

                            <button type='submit' className='btn bg-main text-white my-3 fw-lighter btn-hover'>
                                Update Password
                                { isLoading ? <Vortex
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="vortex-loading"
                                wrapperStyle={{}}
                                wrapperClass="vortex-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff', '#fff']}
                                /> : ""}
                            </button>

                            { IsSuccess ? <div className="alert alert-success text-center">{IsSuccess}</div> : ""}
                            { errMessage ? <div className="alert alert-danger text-center">{errMessage}</div> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
}
