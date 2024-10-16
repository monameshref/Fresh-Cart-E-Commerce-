import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import logo from "../../assets/images/freshcart-logo.svg"
import { authContext } from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';

export default function Navbar() {
    const {token,setToken} = useContext(authContext);
    const navigate = useNavigate();

    const {numOfCartItems} = useContext(cartContext);
    const {countWishlist} = useContext(wishlistContext);

    function logOut() {
        // Remove Tokem From Your State
        // Remove Tokem From LocalStorge
        // Navigate
        setToken(null);
        localStorage.removeItem("tokenFreshCart");
        navigate("/login");
    }

    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 px-5">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/home">
                    <img src={logo} className='my-2' alt="freshcart-logo" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    { token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link px-2" aria-current="page" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-2" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-2" to="/brands">Brands</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-2" to="/AllOrders">Orders</NavLink>
                        </li>
                    </ul> : ""}

                    <ul className="navbar-nav ms-auto my-2 mb-lg-0 align-items-center justify-content-between">

                        <div className='d-flex justify-content-center align-items-center my-2'>
                            <li className="nav-item social-media px-3">
                                <i className="fa-brands fa-instagram px-2"></i>
                                <i className="fa-brands fa-facebook px-2"></i>
                                <i className="fa-brands fa-tiktok px-2"></i>
                                <i className="fa-brands fa-linkedin px-2"></i>
                                <i className="fa-brands fa-youtube px-2"></i>
                            </li>

                            <div className='d-flex align-items-center pe-5'>
                                { token ? countWishlist ? <li className="nav-item">
                                        <NavLink to="/wishlist">
                                            <i className="fa-solid fa-heart text-main fs-4 position-relative p-2" title='Wishlist'>
                                                <span className="badge bg-main text-white fs-12 position-absolute top-0 start-100 translate-middle">
                                                    {countWishlist ? countWishlist : ""}
                                                </span>
                                            </i>
                                        </NavLink>
                                    </li> : "" : "" }

                                { token ? numOfCartItems ? <li className="nav-item ps-3">
                                        <NavLink to="/cart">
                                            <i className="fa-solid fa-cart-shopping text-main fs-4 position-relative p-2" title='Cart'>
                                                <span className="badge bg-main text-white fs-12 position-absolute top-0 start-100 translate-middle">
                                                    {/* {numOfCartItems ?? ""} */}
                                                    {numOfCartItems ? numOfCartItems : ""}
                                                </span>
                                            </i>
                                        </NavLink>
                                    </li> : "" : "" }

                                { token ? <li className="nav-item ps-3">
                                        <NavLink to="/Profile">
                                            <i className="fa-regular fa-user text-main fs-4 position-relative p-2" title='Profile'></i>
                                        </NavLink>
                                    </li> : "" }
                            </div>
                        </div>

                        { token ? <li className="nav-item">
                                    <span onClick={logOut} role='button' className='btn text-white bg-main'>
                                        SignOut
                                        <i className="fa-solid fa-arrow-right-from-bracket ps-2"></i>
                                    </span>
                                </li> : <>

                            <li className="nav-item">
                                <NavLink className="nav-link px-3" to="/register">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link px-3" to="/login">Login</NavLink>
                            </li>
                        </>}
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
}
