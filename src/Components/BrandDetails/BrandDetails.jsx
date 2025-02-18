import React, { useContext, useEffect, useState } from "react";
import style from "./BrandDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";



export default function BrandDetails() {

  
  const [RelatetProducts, setRelatetProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  // const [cruentBrand, setcruentBrand] = useState(0);
  const [CurrentProduct, setCurrentProduct] = useState(0);
  let { AddProductToCart } = useContext(CartContext);
  let { id, category } = useParams();

  async function addProduct(id) {
    setLoading(true);
    setCurrentProduct(id);
    let response = await AddProductToCart(id);
    console.log(response);

    if (response.data.status == "success") {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  function getBranDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        // console.log(res?.data.data[0].brand.name);

        console.log(res.data.data.name);

        setcruentBrand(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getallproduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // console.log(res?.data.data.brand.name);
        let related = res.data.data.filter(
          (product) => product.brand.name === category
        );
        setRelatetProducts(related);
        
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getBranDetails(id);
    getallproduct();
  }, []);
console.log(RelatetProducts);


if (RelatetProducts?.length == 0) {
  return (
    <>
      <h2 className="text-emerald-600 text-2xl mt-12 capitalize bg-slate-300 m-auto w-fit font-semibold rounded-2xl py-3 px-10">
        no data to show
      </h2>
    </>
  );
}
else{
  return (
    <>

      <div className="row">
        {RelatetProducts?.length>0 ?  RelatetProducts.map((product) => (
          <div key={product._id} className="xl:w-1/6 md:w-1/3 lg:w-1/4  ">
            <div className="product p-2">
              <Link
                to={`/productdetails/${product._id}/${product.category.name}`}
              >
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt="image of product"
                />
                <h3 className="text-emerald-600 text-start">
                  {product.category.name}
                </h3>
                <h4 className="font-semibold mb-3 text-start">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h4>
                <div className="flex justify-between pe-3">
                  <span>{product.price} EGY</span>
                  <span>
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => addProduct(product.id)}
                className="btn w-full px-4 py-2 text-white bg-emerald-600 rounded-lg"
              >
                {Loading && CurrentProduct == product.id ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        )) : (
          <>
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </>
        )}
      </div>  
    </>
  );

}



}
