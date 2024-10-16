import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';

export const cartContext = createContext();

export default function CartContextProvider({children}) {

    const [allProducts, setAllProducts] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartId, setCartId] = useState(null);

    // console.log(cartId);

    const {token} = useContext(authContext);


    async function addProductToCart(productId) {
        try{
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {"productId": productId} ,
                { headers: {token:localStorage.getItem("tokenFreshCart")}}
            );
            // console.log("addProductToCart",data);
            // setAllProducts(data.data.products);
            // setNumOfCartItems(data.numOfCartItems);
            // setTotalCartPrice(data.data.totalCartPrice);
            getLoggedUserCart();
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    async function getLoggedUserCart() {
        try{
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
                {headers:{ token: localStorage.getItem("tokenFreshCart")}})
                setCartId(data.data._id);

                    setAllProducts(data.data.products);
                    setNumOfCartItems(data.numOfCartItems);
                    setTotalCartPrice(data.data.totalCartPrice);
                    // console.log("getLoggedUserCart",data);
                    localStorage.setItem("userId",data?.data.cartOwner);

                    // console.log(data.data._id); 
                    return data;
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(function() {
        getLoggedUserCart();
    },[token]);

    async function updateCount(id,newCount) {
        const data = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            "count": newCount
        },{headers: { token: localStorage.getItem("tokenFreshCart") }})
            .then( (res)=>{
                console.log('updateCount',res.data);
                setAllProducts(res.data.data.products);
                setNumOfCartItems(res.data.numOfCartItems);
                setTotalCartPrice(res.data.data.totalCartPrice);
                return true;
            } )
            .catch( (err)=>{
                console.log(err);
                return false;
            } )

            return data;
    }

    async function deleteProduct(id) {
        const data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {headers: { token: localStorage.getItem("tokenFreshCart") }})
            .then( (res)=>{
                // console.log('deleteProduct',res.data);
                setAllProducts(res.data.data.products);
                setNumOfCartItems(res.data.numOfCartItems);
                setTotalCartPrice(res.data.data.totalCartPrice);
                return true;
            } )
            .catch( (err)=>{
                // console.log(err.response.data.message);
                return false;
            } )

            return data;
    }

    async function clearCart() {
        const data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {headers: { token: localStorage.getItem("tokenFreshCart") }})
            .then( (res)=>{
                console.log('clearCart',res.data);
                getLoggedUserCart();
                return true;
            } )
            .catch( (err)=>{
                // console.log(err.response.data.message);
                return false;
            } )

            return data;
    }

    return <cartContext.Provider value={ {addProductToCart, updateCount, deleteProduct, clearCart, getLoggedUserCart,
                                        numOfCartItems, totalCartPrice, allProducts, cartId} }>
        {children}
    </cartContext.Provider>
}
