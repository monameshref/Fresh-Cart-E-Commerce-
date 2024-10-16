import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';


export default function Product({product}) {

    const {addProductToCart} = useContext(cartContext);
    const {addProductToWishlist} = useContext(wishlistContext);

    async function addProduct(id) {
        const res = await addProductToCart(id);
            if (res.status === "success") {
                toast.success(res.message);
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

    return <>
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className='product rounded position-relative p-3'>
                <Link to={`/productDetails/${product.id}`}>
                    <div>
                        <figure className='border-bottom pb-3'>
                            <img src={product.imageCover} className='w-100' alt={product.title} />
                        </figure>
                        <figcaption>
                            <h2 className='text-main h6'>{product.title.split(" ").slice(0 , 2).join(" ")}</h2>
                            <h3 className='h6 fw-bold'>{product.category.name}</h3>
                            <div className="footer">
                                <div className='d-flex justify-content-between fs-6'>
                                    { product.priceAfterDiscount ?
                                        <p className='d-flex align-items-center'>
                                            <span className='sale bg-danger text-white d-flex justify-content-center align-items-center rounded position-absolute'>Sale</span>
                                            <span className='fw-bold pe-2'>EGP {product.price}</span>
                                            <span className='text-danger font-sm fw-bold text-decoration-line-through'> {product.priceAfterDiscount}</span>
                                        </p> :
                                        <span className='fw-bold pe-2'>EGP {product.price}</span>}

                                    <p className='d-flex align-items-center'>
                                        <i className="fa-solid fa-star rating-color pe-1 iconStar"></i>
                                        {product.ratingsAverage}
                                    </p>
                                </div>
                            </div>
                        </figcaption>
                    </div>
                </Link>
                <div className='d-flex justify-content-evenly'>
                    <button onClick={()=>{addProduct(product.id)}} className='btn bg-main text-white'>Add To Cart</button>

                    <button className='btn bg-main text-white wishlist' onClick={() => {addToWishList(product.id)}}>
                        <i className="fa-solid fa-heart fs-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </>
}