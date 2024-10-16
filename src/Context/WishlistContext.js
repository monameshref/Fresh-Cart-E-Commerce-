import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

    const [countWishlist, setCountWishlist] = useState(0);
    const [allProducts, setAllProducts] = useState(null);
    const [wishListDetails, setWishListDetails] = useState([]);

    const {token} = useContext(authContext);

    async function getLoggedUserWishlist() {
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { headers: { token: localStorage.getItem("tokenFreshCart") } }
            );
            // console.log(data);
            setCountWishlist(data.count);
            setAllProducts(data.data);
            return data;
        }
        catch (error) {
            console.log(error);
            }
    }

    async function addProductToWishlist(id) {
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId: id },
                { headers: { token: localStorage.getItem("tokenFreshCart") } }
            );
            // console.log(data);
            getLoggedUserWishlist();
            return data;
        }
        catch (error) {
            console.log(error);
            }
    }

    async function removeProductFromWishlist(id) {
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                { headers: { token: localStorage.getItem("tokenFreshCart") } }
            );
            // console.log(data);
            getLoggedUserWishlist();
            return data;
        }
        catch (error) {
            console.log(error);
            }
    }

    useEffect(function() {
        getLoggedUserWishlist();
    },[token]);


    return <wishlistContext.Provider value={{addProductToWishlist,removeProductFromWishlist,getLoggedUserWishlist,countWishlist,allProducts,
    wishListDetails, setWishListDetails}}>
            {children}
        </wishlistContext.Provider>;
}
