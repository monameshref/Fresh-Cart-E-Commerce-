import React from 'react'
import imgError from "../../assets/images/Oops.png"
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return <>
        <Helmet>
          <title>FreshCart-Notfound</title>
        </Helmet>
      <section>
        <div className="container p-5">
          <div className="row align-items-center p-5 bg-body-tertiary my-5 rounded">
            <div className="col-lg-6">
              <div>
                <h3 className='fw-bold'>Sorry..! Looks There is something wrong</h3>
                <p className='text-black-50'>Let's back to home page.</p>
              </div>
              <button className='btn bg-main'>
                <a href="/home" className='text-white'>Back to Home</a>
              </button>
            </div>
            <div className="col-lg-6">
              <figure className='d-flex justify-content-center align-items-center p-5 w-100'>
                <img src={imgError} className='w-100' alt="error" />
              </figure>
            </div>
          </div>
        </div>
      </section>
  </>
}
