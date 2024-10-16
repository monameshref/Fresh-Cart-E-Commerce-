import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const {addProductToCart} = useContext(cartContext);
  const {addProductToWishlist} = useContext(wishlistContext);

  const {id} = useParams();

  function getSpecificProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const {data,isLoading} = useQuery("getSpecificProduct",getSpecificProduct);
  // console.log(data?.data.data);
  const productDetails = data?.data.data;

  function getSrc(event){
    // console.log(event?.target);
    const imagePath = event.target.getAttribute("src");
    const mainImage = document.querySelector(".mainImage");

    mainImage.setAttribute("src",imagePath);
  }

  async function addProduct(id){
    const res = await addProductToCart(id);
      if (res.status === "success") {
        // console.log("ProductDetails",res);
        toast.success(res.message , {style: {backgroundColor: "var(--main-color)", color:"#fff"}});
      }
      else {
        toast.error(res.message);
      }
  }

  async function addToWishList(id) {
    let res = await addProductToWishlist(id);
    if (res.status === 'success') {
        toast.success(res.message);
    }
    else {
        toast.error("Failed to remove item");
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return<>
    <section className='ProductDetails'>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center px-3 px-sm-0 g-4">
          <div className="col-sm-7 col-lg-3 shadow p-4 rounded">
            <figure>
                <img src={productDetails.imageCover} className='w-100 mainImage' alt={productDetails.title} />
            </figure>
            <div className='d-flex flex-wrap justify-content-evenly'>
              {productDetails.images.map((image,index) => { return (
                <img key={index} src={image} className='w-25 cursor-pointer images my-2' onClick={getSrc} alt={productDetails.title} />)})}
            </div>
          </div>

          <div className="col-lg-8 offset-lg-1">
            <article className='p-5 shadow-sm border rounded bg-light-subtle position-relative'>
              <h6 className='font-sm fw-bold text-main'>{productDetails.category.name}</h6>

              <h3 className='pt-3 h5 fw-bold'>{productDetails.title}</h3>
              <p className='font-sm fw-bolder py-3 text-black-50'>{productDetails.description}</p>
              <span className='pe-2'><span className='text-main'>Brand :</span> {productDetails.brand.name}</span>

              <div className='d-flex justify-content-between fs-6'>
                { productDetails.priceAfterDiscount ?
                    <p className='d-flex align-items-center'>
                        <span className='sale bg-danger text-white d-flex justify-content-center align-items-center rounded position-absolute'>Sale</span>
                        <span className='pe-2'><span className='text-main'>Price :</span> EGP {productDetails.price}</span>
                        <span className=' text-danger d-block font-sm text-decoration-line-through'>EGP {productDetails.priceAfterDiscount}</span>
                    </p> : <span className='fw-bold pe-2'>EGP {productDetails.price}</span>}
                    

                <p className='d-flex align-items-center'>
                    <i className="fa-solid fa-star rating-color pe-1 iconStar"></i>
                    {productDetails.ratingsAverage}
                </p>
              </div>

              <div className='text-center'>
                <button onClick={ function(){ addProduct(productDetails.id) }} className='btn bg-main text-white w-50 me-4'>Add To Cart</button>

                <button className='btn bg-main text-white' onClick={()=> {addToWishList(productDetails.id)}}>
                  <i className="fa-solid fa-heart fs-5"></i>
                </button>
              </div>
            </article>
            {/* <h6>{productDetails.id}</h6> */}
          </div>
        </div>
      </div>
    </section>
  </>
}