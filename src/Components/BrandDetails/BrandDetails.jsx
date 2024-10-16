import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import axios from 'axios';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';
import emptyBrands from "../../assets/images/emptyBrands.png"
import { Helmet } from 'react-helmet';

export default function BrandDetails() {

    const {id} = useParams();

    const {addProductToCart} = useContext(cartContext);
    const {addProductToWishlist} = useContext(wishlistContext);

    async function getAllProducts(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    const {data,isLoading} = useQuery("getBrandDetails",getAllProducts);

    let filterData = data?.data.data.filter((product) => product.brand._id === id)
    // console.log(filterData);

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

    return <>
        <Helmet>
            <title>FreshCart-Brand Details</title>
        </Helmet>
        <section>
            <div className="container py-5">
                <div className="row">
                        {filterData.map((product) => (
                        <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
                            <div className='product rounded position-relative p-3'>
                                <Link to={`/productDetails/${product._id}`}>
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
                        </div>))}

                            <div className='p-4 text-center'>
                                {filterData?.length === 0 || filterData == [] ?
                                    <div className='d-flex justify-content-center flex-column align-items-center my-4'>
                                        <h2> There Are No Products in Your Category Details...</h2>
                                        <img src={emptyBrands} className='w-25' alt="emptyCart" />
                                    </div> : ""}
                            </div>
                </div>
            </div>
        </section>
    </>
}
