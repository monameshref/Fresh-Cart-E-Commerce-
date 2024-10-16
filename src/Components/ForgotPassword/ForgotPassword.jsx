import React, { useState } from 'react'

import forgotPasswordImg from "../../assets/images/fp-g.svg"
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { Vortex } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgotPassword() {

    const [errMessage, setErrMessage] = useState(undefined);
    const [IsSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formStatus, setFormStatus] = useState(true);
    const navigate = useNavigate();

    const userData = {
        email:"",
    };

    async function forgotPassword(values) {
        setIsLoading(true);
        const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
        .then((sucsess)=>{
            // console.log(sucsess.config.data);
            if (sucsess.data.statusMsg === "success"){
                setIsSuccess(true);
                setIsSuccess(sucsess.data.message);
                    setTimeout(function(){
                        setIsSuccess(false);
                    },2000);
                setFormStatus(false);
            }
        })
        .catch((error)=>{
            setErrMessage(error.response.data.message);
                setTimeout(function(){
                    setErrMessage(undefined);
                },2000);
        })
        setIsLoading(false);
    }

    async function verifyResetCode(value){
        const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",value)
        .then((sucsess)=>{
            // console.log("sucsess verifyResetCode" ,sucsess);

            if (sucsess.data.status === "Success"){
                    setIsSuccess(true);
                    setIsSuccess(sucsess.data.status);
                        setTimeout(function(){
                            setIsSuccess(false);
                        },2000);
                    setFormStatus(false);
                    navigate("/ResetPassword");
            }
        })
        .catch((error)=>{
            // console.log("error verifyResetCode" ,error);

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
    });

    const validationSchema2 = yup.object({
        resetCode:yup.string().matches(/^[0-9]{4,6}$/,"Enter Valid Code").required("This Reset Code Is Required"),
    });

    const formik = useFormik({
        initialValues: userData,
        onSubmit: forgotPassword,
        validationSchema: validationSchema
    });

    const formik2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: verifyResetCode,
        validationSchema: validationSchema2
    });



    return <>
        <Helmet>
            <title>FreshCart-ForgotPassword</title>
        </Helmet>
        <section className='forgotPassword'>
        <div className="container">
            <div className="row align-items-center py-5">
                <div className="col-md-5">
                    <figure>
                        <img src={forgotPasswordImg} className='w-75' alt="forgotPassword" />
                    </figure>
                </div>

                <div className="col-md-7">
                    <div className='shadow p-5 rounded bg-body-tertiary'>
                    { formStatus ? <form onSubmit={formik.handleSubmit}>
                                        <div className='title'>
                                            <h2 className='fs-4 fw-bold'>Forgot your password?</h2>
                                            <p className='text-black-50'>Please enter the email address associated with your account and We will email you a link to reset your password.</p>
                                        </div>
                                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' placeholder='Email' className='form-control input-focuc mt-3' />
                                        { formik.errors.email && formik.touched.email ?
                                            <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                                {formik.errors.email}
                                            </div> : "" }
                                        <div className='d-flex flex-column my-3'>
                                            <button type='submit' className='btn bg-main text-white w-50 m-auto'>
                                                Reset Password
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
                                            <Link to="/login" className='btn bg-dark-subtle text-black w-50 m-auto mt-3'>
                                                <button className='btn border-0 fw-bold'>Back</button>
                                            </Link>
                                        </div>
                                        { IsSuccess ? <div className="alert alert-success text-center">{IsSuccess}</div> : ""}
                                        { errMessage ? <div className="alert alert-danger text-center">{errMessage}</div> : ""}
                                    </form> : <form onSubmit={formik2.handleSubmit}>
                                                <div className='title'>
                                                    <h2 className='fs-4 fw-bold'>Verify Code Your Email Address</h2>
                                                    <p className='text-black-50'>To Verify Your Email Address, Enter This Code in Your Browser.</p>
                                                </div>
                                                <input onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.resetCode} type="text" name='resetCode' className='form-control input-focuc mt-3 w-25 m-auto p-3 text-center'/>
                                                    { formik2.errors.resetCode && formik2.touched.resetCode ?
                                                        <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                                            {formik2.errors.resetCode}
                                                        </div> : "" }
                                                <div className='d-flex flex-column my-3'>
                                                    <button type='submit' className='btn bg-main text-white w-50 m-auto'>
                                                        Vriefy Code
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
                                                </div>
                                                { IsSuccess ? <div className="alert alert-success text-center">{IsSuccess}</div> : ""}
                                                { errMessage ? <div className="alert alert-danger text-center">{errMessage}</div> : ""}
                                            </form>}
                    </div>
                </div>
            </div>
        </div>
        </section>
    </>
}
