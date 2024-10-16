import React, { useContext, useEffect, useState } from 'react'
import loginImg from "../../assets/images/login-amico.png"
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios';
import { Vortex } from 'react-loader-spinner';
import { json, Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {
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
      password:""
    };

    const {setToken} = useContext(authContext);

    //! Send Data to Backend
    const [IsSuccess, setIsSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(values){
      // console.log(values);
      setIsLoading(true);
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      .then(function(sucsess) {
        if (sucsess.data.message === "success") {
        console.log("sucsess",sucsess.data);
        // console.log("Token",sucsess.data.token);
        localStorage.setItem("tokenFreshCart",sucsess.data.token);
        setToken(sucsess.data.token);
        localStorage.setItem("userData", JSON.stringify(sucsess.data.user));

        setIsSuccess(true);
        setIsSuccess(sucsess.data.message);
          setTimeout(function(){
            setIsSuccess(false);
            navigate("/home");
          },2000);
        setIsLoading(false);
        }
      })
      .catch(function(error) {
        console.log("error",error);
        setIsSuccess(false);
        setErrMessage(error.response.data.message);
          setTimeout(function(){
            setErrMessage(undefined);
        },2000);
        setIsLoading(false);
      });
    };

    //! Custom Validation Inputs
  /*   function validation(values){
      const errors = {};
  
      const regexName = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802 [\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){4,20}$/;
      // const regexName = /^[A-Z][a-z]{3,7}$/;
      const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  
      const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
      const regexPhone = /^01[0125][0-9]{8}$/;
  
      if (regexName.test(values.name) === false) {
        errors.name = "Name Must Be From 4 to 20 Characters";
      }
      if (regexEmail.test(values.email) === false) {
        errors.email = "please enter an email must be in format";
      }
      if (regexPhone.test(values.phone) === false) {
        errors.phone = "please enter a Phone must be an Egyption Number";
      }
      if (regexPassword.test(values.password) === false) {
        errors.password = "Password Minimum eight characters, at least one letter and one number";
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "Password and rePassword Don't Match";
      }
      console.log(errors);
      return errors;
    } */

    //! Validation Inputs By Yup
    const validationSchema = yup.object({
      email:yup.string().email("Please Enter an Email Must Be In Format").required("This Email Is Required"),
      password:yup.string().required("This Password Is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Password Minimum Eight Characters, at least One Letter and One Number"),
    });

    const formik = useFormik({
      initialValues: userData,
      onSubmit: onSubmit,
      // validate: validation,
      validationSchema:validationSchema
    });

  return <>
        <Helmet>
          <title>FreshCart-Login</title>
        </Helmet>
    <section className='login'>
      <div className="container">
        <div className="row align-items-center py-5">
          <div className="col-md-5">
            <figure>
              <img src={loginImg} className='w-75' alt="signup" />
            </figure>
          </div>

          <div className="col-md-7">
            <div className='shadow p-5 rounded bg-body-tertiary'>
              <div className='title'>
                <h2 className='fs-4 fw-bold'>Sign in to FreshCart</h2>
                <p className='text-black-50'>Welcome back to FreshCart! Enter your email to get started.</p>
              </div>

            <form onSubmit={formik.handleSubmit}>

              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' placeholder='Email' className='form-control input-focuc mt-3' />
                { formik.errors.email && formik.touched.email ?
                  <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                    {formik.errors.email}
                  </div> : "" }

                <div className='position-relative'>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' placeholder='Password' className='form-control input-focuc mt-3' />
                  <span className='passBtn position-absolute cursor-pointer'>
                    <i className="fa-solid fa-eye-slash passIcon"></i>
                </span>
                </div>
                { formik.errors.password && formik.touched.password ?
                  <div className='text-danger fw-bold m-2 aleart'><i className="fa-solid fa-triangle-exclamation pe-2"></i>
                    {formik.errors.password}
                  </div> : "" }

              <p className='font-sm pt-3 m-0 d-flex justify-content-end'>Forgot password? <Link to="/ForgotPassword" className='text-main fw-bold ps-1'>Reset It</Link></p>
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-3 fw-lighter btn-hover'>
                Sign in
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
                <p className='fs-6'>Don’t have an account? <Link to="/register" className='text-main fw-bold'>Sign up</Link></p>
            </form>
                  { IsSuccess ? <div className="alert alert-success text-center">{IsSuccess}</div> : ""}
                  { errMessage ? <div className="alert alert-danger text-center">{errMessage}</div> : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}
