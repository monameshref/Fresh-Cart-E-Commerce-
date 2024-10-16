import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import cashImg from "../../assets/images/cash.png"
import onlineImg from "../../assets/images/visa-1.svg"
import emptyCart from "../../assets/images/empty-cart-22jpg.jpg"
import { Helmet } from 'react-helmet';


export default function Cart() {

  const {allProducts, totalCartPrice, updateCount, deleteProduct, clearCart,numOfCartItems} = useContext(cartContext);

  // console.log(allProducts);

  if (!allProducts) {
    return <LoadingScreen />
  }

  async function removeProductFromCart(id){
    const res = await deleteProduct(id);

    if (res) {
      // console.log("removeProductFromCart",res);
      toast.warning("Product removed from Shopping Cart");
    }
    else {
      // console.log("Error...",res);
      toast.error(res.message);
    }
  }

  return <>
      <Helmet>
        <title>FreshCart-Cart</title>
    </Helmet>
    <section className='cart p-5'>
      <div className="container py-5 px-5 my-5 rounded bg-body-tertiary">
        <div className="title pb-3">
          <h2>Shop Cart:</h2>
          <h5 className='text-main'>Total Cart Price: {totalCartPrice} EGP</h5>
        </div>

          <div className="payment d-flex justify-content-between align-items-center">
            <button onClick={clearCart} className='btn bg-danger text-white'>Clear Cart</button>
            <div className='d-flex py-5'>
              <Link to="/CashPayment">
                <button className='btn bg-main text-white ms-3'>
                  Cash Payment
                  <img src={cashImg} className='ms-2' style={{width:"25px"}} alt="cashpayment" />
                  </button>
              </Link>
              <Link to="/OnlinePayment">
                <button className='btn bg-main text-white ms-3'>
                  Online Payment
                  <img src={onlineImg} className='ms-2' style={{width:"25px"}} alt="visapayment" />
                  </button>
              </Link>
            </div>
          </div>

          { numOfCartItems ? <>
            { allProducts?.map(function(product,index){ return (
          <div key={index} className="row gy-4 py-5 px-3 border-bottom align-items-center">

            <div className="col-sm-2">
              <figcaption>
                <img src={product.product.imageCover} className='w-100 rounded' alt={product.product.title} />
              </figcaption>
            </div>
            <div className="col-sm-7">
              <article>
                <h6>{product.product.title}</h6>
                <h6 className='text-main fw-bold'>Price: {product.price}</h6>
                <button onClick={()=>{removeProductFromCart(product.product.id)}} className='btn btn-outline-danger my-2'>
                  <i className="fa-solid fa-trash-can pe-2"></i>
                    Remove
                </button>
              </article>
            </div>
            <div className="col-sm-3">
              <div className='d-flex justify-content-around align-items-center'>
                <button onClick={()=> updateCount(product.product.id , product.count + 1)} className='btn btn-outline-success'>+</button>
                <span>{product.count}</span>
                <button disabled={product.count == 1} onClick={()=> updateCount(product.product.id , product.count - 1)} className='btn btn-outline-success'>-</button>
              </div>
            </div>

            {/* <h6>1- {product._id}</h6>
            <h6>2- {product.product.id}</h6> */}

        </div>
            ) }) }
          </> : <div className='d-flex justify-content-center flex-column align-items-center my-4'>
                  <h2> Your Cart is Empty...</h2>
                  <img src={emptyCart} className='w-50 rounded' alt="emptyCart" />
                  </div> }
      </div>
    </section>
  
  </>
}
