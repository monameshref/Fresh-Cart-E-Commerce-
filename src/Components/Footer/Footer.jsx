import React from "react";

import amazon from "../../assets/images/amazon-pay.png";
import american from "../../assets/images/american-express.png";
import card from "../../assets/images/card.png";
import paypal from "../../assets/images/paypal.png";
import appStore from "../../assets/images/appstore-btn.svg";
import googlePlay from "../../assets/images/googleplay-btn.svg";

export default function Footer() {
  return (
    <>
      <footer className="bg-body-tertiary">
        <div className="container-fluid p-5">
          <h5 className="fw-light">Get the FreshCart app</h5>
          <p className="text-black-50">
            We Will Send You a Link, Open it on Your Phone to Download the app.
          </p>

          <div className="row">
            <div className="col-md-12">
              <form className="d-flex flex-wrap">
                <div className="col-12 col-md-9">
                  <input
                    type="email"
                    placeholder="Email..."
                    className="form-control input-focuc mb-2"
                  />
                </div>
                <div className="col-7 col-md-3">
                  <button type="button" className="btn bg-main text-white ms-md-4 btn-hover">
                    Share App Link
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="row py-3 mt-3 border-1 border-top border-bottom align-items-center">
            <div className="col-lg-6">
              <div className="d-flex align-items-center mb-3 flex-wrap">
                <h6>Payment Partners</h6>
                <div className="images">
                  <img src={amazon} className="ps-3" alt="amazon-pay" />
                  <img src={american} className="ps-3" alt="american-express" />
                  <img src={card} className="ps-3" alt="card" />
                  <img src={paypal} className="ps-3" alt="paypal" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center flex-wrap">
                <h6 className="fw-bold">Get Deliveries With FreshCart app</h6>
                <div className="box">
                  <img src={appStore} className="mx-2" alt="app-store" />
                  <img src={googlePlay} className="mx-2" alt="google-store" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
