import React, { useContext } from 'react'
import { wishlistContext } from '../../Context/WishlistContext'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { cartContext } from '../../Context/CartContext';
import emptyCart from "../../assets/images/empty-wishlist.png"
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function Wishlist() {

    const {allProducts,removeProductFromWishlist,countWishlist} = useContext(wishlistContext);
    const {addProductToCart} = useContext(cartContext);

    // console.log(allProducts);

    async function addProduct(id) {
        const res = await addProductToCart(id);
            if (res.status === "success") {
                toast.success(res.message);
            }
            else {
                toast.error(res.message);
            }
    }

    async function deleteProductFromWishlist(id) {
        const res = await removeProductFromWishlist(id);
            if (res.status === "success") {
                toast.warning(res.message);
            }
            else {
                toast.error(res.message);
            }
    }

    if (!allProducts) {
        return <LoadingScreen />
    }

    return <>
        <Helmet>
            <title>FreshCart-Products Favorite</title>
        </Helmet>
        <section className='wishlist py-5'>
            <div className="container p-4 rounded">
                <div className="row">
                    <div className='pb-5'>
                        <h3 className='fw-bold'>My Wishlist</h3>
                        <h5>There are <span className='fw-bold'> {countWishlist} </span> products in this wishlist.</h5>
                    </div>
                    <table className='table table-striped table-hover border text-center'>
                        <thead >
                            <tr className='fw-bold'>
                                <td className='p-2 bg-body-secondary'>Index</td>
                                <td className='p-2 bg-body-secondary'>Product</td>
                                <td className='p-2 bg-body-secondary'>Price</td>
                                <td className='p-2 bg-body-secondary'>Actions</td>
                                <td className='p-2 bg-body-secondary'>Remove</td>
                            </tr>
                        </thead>

                        { countWishlist ? <>
                            { allProducts.map(function(product,index){return (
                                    <tbody key={product.id}>
                                        <tr className='border-bottom align-middle'>
                                            <td>{index + 1 }</td>
                                            <td className='d-flex align-items-center'>
                                                <figure className='pe-4'>
                                                    <img src={product.imageCover} alt={product.title} />
                                                </figure>
                                                <figcaption>
                                                    <h6>{product.title.split(" ").slice(0 , 2).join(" ")}</h6>
                                                    <p>Remaining quantity : {product.ratingsQuantity}</p>
                                                </figcaption>
                                            </td>
                                            <td>
                                                {product.price} EGP
                                            </td>
                                            <td>
                                                <i onClick={()=>{addProduct(product.id)}} title='Cart' className="fa-solid fa-cart-shopping fs-5 cursor-pointer text-success"></i>
                                            </td>
                                            <td>
                                                <i onClick={()=>{deleteProductFromWishlist(product.id)}} title='Delete' className="fa-solid fa-trash-can fs-5 cursor-pointer text-danger"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                            )}) }
                            </> : <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <div className='d-flex justify-content-center flex-column align-items-center py-5'>
                                            <h2> Your Wishlist is Empty...</h2>
                                            <img src={emptyCart} className='w-50' alt="emptyWishlist" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>}
                        
                    </table>
                </div>
            </div>
        </section>
    </>
}
