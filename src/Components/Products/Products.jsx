import Product from '../Product/Product';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Products() {
    // const [allProducts, setAllProducts] = useState(null);

    const [searchProducts, setSearchProducts] = useState([]);

    function getAllProducts(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
        // console.log(data.data);
        // setAllProducts(data.data);
    }

    const {data,isLoading} = useQuery("getAllProducts",getAllProducts);
    // console.log(data?.data.data);
    const allProducts = data?.data.data;

    // useEffect( ()=> {
    //     getAllProducts();
    // },[]);

    function search(event) {
        const term = event.target.value;
        const newSearchProducts = allProducts.filter((element)=>{return element.title.toLowerCase().trim().includes(term.toLowerCase().trim())});
        setSearchProducts(newSearchProducts);
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return <>
        <Helmet>
            <title>FreshCart-Products</title>
        </Helmet>
        <section className='products py-4'>
            <div className="container">
                <div className="row g-4">
                    <div className='d-flex flex-wrap'>
                        <h2 className='h4 fw-bold pt-5'>Shop Popular Products</h2>
                        <form className='position-relative w-50 m-auto'>
                            <input onChange={search} type="text" placeholder='Search...' className='form-control my-5 input-focuc border border-success position-relative'/>
                            <i className="fa-solid fa-magnifying-glass position-absolute p-2 text-white bg-main rounded"></i>
                        </form>
                        {/* <h2 className='bg-main text-white rounded p-2 text-center w-50 my-5 m-auto'>All Products</h2> */}
                    </div>
                    { searchProducts.length ? searchProducts.map(( product )=> { return <Product key={product.id} product={product} />})
                        : allProducts.map(( product )=> { return <Product key={product.id} product={product} />})}
                </div>
            </div>
        </section>
    </>
}
