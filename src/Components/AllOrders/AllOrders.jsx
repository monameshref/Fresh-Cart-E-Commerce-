import axios from 'axios'
import { useQuery } from 'react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

export default function AllOrders() {

  async function getUserOrders(){
    const userId = localStorage.getItem("userId");
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }

  const {data,isLoading} = useQuery("getUserOrders",getUserOrders);
  const allOrders = data?.data;
  // console.log(allOrders);

  if (isLoading) {
    return <LoadingScreen />
  }

  return <>

  <Helmet>
    <title>FreshCart-AllOrders</title>
  </Helmet>

    <section className='allOrders'>
      <div className="container p-5">
        { allOrders.map((order,index)=>{ return (
                <div key={index} className="row my-4 p-5 py-4 shadow rounded border">
                  <div className="order">
                    <div className='py-3 d-flex align-items-center justify-content-between order-text'>
                      <div className='d-flex align-items-center'>
                        <h2 className='fw-bold fs-1'>{order.id}</h2>
                        <h4 className='fw-bold text-primary mx-4 fs-4'>processing</h4>
                      </div>
                      <div className='d-flex flex-column bg-body-tertiary p-3 rounded card'>
                        <h6 className='fw-bold mx-4 fs-6'>Payment Method : <span className='fw-normal'>{order.paymentMethodType}</span> </h6>
                        <h6 className='fw-bold mx-4 fs-6'>Shipping City : <span className='fw-normal'>{order.shippingAddress.city}</span> </h6>
                        <h6 className='fw-bold mx-4 fs-6'>Shipping Address : <span className='fw-normal'>{order.shippingAddress.details}</span> </h6>
                        <h6 className='fw-bold mx-4 fs-6'>Phone : <span className='fw-normal'>{order.shippingAddress.phone}</span> </h6>
                      </div>
                    </div>
                    <p key={order.cartItems._id} className='h5'>you have ordered <span className='fw-bold'>{order.cartItems.length}</span> items.</p>

                    <div className="row border-bottom my-4">
                      { order.cartItems.map((item,secIndex)=>{return (
                          <div key={secIndex} className="col-sm-3 col-md-2">
                            <div className='montag'>
                              <figure className='p-2 card'>
                                <img src={item.product.imageCover} className='w-100 rounded' alt={item.product.title} />
                              </figure>
                            </div>
                        </div>
                      ) }) }
                    </div>

                    <div className='d-flex justify-content-between'>
                      <p className='fw-bold fs-5'>Total Price : {order.totalOrderPrice} EGP</p>
                      <p className='fw-bold fs-5'>{order.updatedAt.split("T").slice(0, 3).join(" : ").split(".").slice(0, 1).join(" ")}</p>
                    </div>

                  </div>
                </div>
        ) }) }
      </div>
    </section>
  </>
}