import React, { useState } from "react";
import style from "./Products.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import useProducts from "../../HOOKS/useProducts";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  const [Loading, setLoading] = useState(false);
  const [CurrentProduct, setCurrentProduct] = useState(0);
  let { data, isError, error, isLoading, isFetching } = useProducts();
console.log(data?.data.data);

  let { AddProductToCart } = useContext(CartContext);

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

  if (isError) {
    return <h2>{error}</h2>;
  }

  if (isLoading) {
    return (
      <>
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </>
    );
  }

  // const [Products, setProducts] = useState([]);

  // function getProducts() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       // console.log(res.data.data);
  //       setProducts(res.data.data);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      <div className="row">
        {data?.data?.data.map((product) => (
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
                {Loading&& CurrentProduct==product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add To Cart"}
               
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
