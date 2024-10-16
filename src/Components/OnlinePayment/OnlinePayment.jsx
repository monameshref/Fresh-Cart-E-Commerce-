import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import * as yup from "yup"
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import onlineImg from "../../assets/images/visa-1.svg"
import onlineImg2 from "../../assets/images/Online-transactions-rafiki.svg"
import { Helmet } from 'react-helmet';




export default function OnlinePayment() {
    const {cartId,getLoggedUserCart} = useContext(cartContext);
    const nav = useNavigate();

    const userData = {
            details: "",
            phone: "",
            city: "",
    };

    async function confirmOnlinePayment(){
        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
            shippingAddress: userData
        },
            {
                headers:{
                    token:localStorage.getItem("tokenFreshCart")
                },
                params:{
                    url: "http://localhost:3000"
                }
            }
        )
        .then((res)=>{
            if (res.data.status === "success") {
                // toast.success("Payment Completed Successfily");
                // getLoggedUserCart();
                window.open(res.data.session.url,"_self");
            }
        })
        .catch((err)=>{
            // console.log(err);
            toast.error(err.response.data.message);
    }) }

    //! Validation Inputs By Yup
    const validationSchema = yup.object({
        city:yup.string().required("This City Is Required").matches(/^[\w-]{3,}$/,"Please Enter a Valid City"),
        phone:yup.string().required("This Phone Is Required").matches(/^01[0125][0-9]{8}$/,"Please Enter a Phone Must Be an Egyption Number"),
        details:yup.string().required("This Details Is Required").matches(/^[\w-]{3,}$/,"Please Enter a Valid Details"),
    });

    const formik = useFormik({
        initialValues: userData,
        onSubmit: confirmOnlinePayment,
        validationSchema:validationSchema
    });

    return <>
            <Helmet>
            <title>FreshCart-OnlinePayment</title>
        </Helmet>
    <section>
        <div className="container">
            <div className="row align-items-center py-5">
                <div className="col-md-6">
                    <figure>
                        <img src={onlineImg2} className='w-100' alt="Online-transactions-rafiki" />
                    </figure>
                </div>
                <div className="col-md-6">

                    <div className='shadow p-5 rounded bg-body-tertiary'>
                        <div className='title'>
                            <h2 className='fs-4 fw-bold'>Fill your address details</h2>
                            <p className='text-main h6 fw-bold py-2 '>Choose from your addresses:</p>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name='city' placeholder='City...' className='form-control input-focuc mt-3' />
                            { formik.errors.city && formik.touched.city ?
                                <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                {formik.errors.city}
                                </div> : "" }

                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="text" name='phone' placeholder='Phone...' className='form-control input-focuc mt-3' />
                            { formik.errors.phone && formik.touched.phone ?
                                <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                {formik.errors.phone}
                                </div> : "" }

                            <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name='details' placeholder='Address Details...' className='form-control input-focuc mt-3' />
                            { formik.errors.details && formik.touched.details ?
                                <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                                {formik.errors.details}
                                </div> : "" }

                                <button type='submit' className='btn bg-main text-white my-3 fw-lighter btn-hover'>
                                    Online Payment
                                    <img src={onlineImg} className='ms-2' style={{width:"25px"}} alt="visapayment" />
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
}
