import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';


export default function ProductDetails() {
    const [Loading, setLoading] = useState(false);
    const [CurrentProduct, setCurrentProduct] = useState(0);
  let { AddProductToCart } = useContext(CartContext);
  
  async function addProduct(id) {
    setLoading(true);
    setCurrentProduct(id)
    let response = await AddProductToCart(id);

    console.log(response);


    if(response.data.status == "success"){
   
      setLoading(false);
      toast.success(response.data.message)
    }
    else
    {
      setLoading(false);
      toast.error(response.data.message)
    }
  }


  let { id, category } = useParams();
  // console.log(id);

  const [Product, setProduct] = useState(null);
  const [RelatetProducts, setRelatetProducts] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data.imageCover);
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getallproduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // console.log(res.data.data);

        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        // console.log(related);
        setRelatetProducts(related);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProduct(id);
    getallproduct();
  }, [id, category]);

  return (
    <>
      {Product ? (
        <div className="row items-center">
          <div className="w-1/4">
            <Slider {...settings}>
              {Product?.images.map((src) => (
                <img key={Product.id} src={src} alt="" />
              ))}
            </Slider>
         
          </div>
          <div className="w-3/4 text-left p-4">
            <h3 className="font-semibold capitalize text-2xl">
              {Product?.title}
            </h3>
            <h4 className="text-gray-700 my-4">{Product?.description}</h4>
            <h4 className="text-emerald-600">{Product?.category.name}</h4>
            <div className="flex justify-between p-3">
              <span>{Product?.price} EGY</span>
              <span>
                <i className="fa-solid fa-star text-yellow-500"></i>
                {Product?.ratingsAverage}
              </span>
            </div>
            <button onClick={() => addProduct(Product.id)} className="btn w-full px-4 py-2 text-white bg-emerald-600 rounded-lg">
            {Loading&& CurrentProduct==Product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add To Cart"}
       
            </button>
          </div>
        </div>
      ) : (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      <div className="row">
        {RelatetProducts.map((product) => (
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
              <button onClick={() => addProduct(product.id)} className="btn w-full px-4 py-2 text-white bg-emerald-600 rounded-lg">
              {Loading&& CurrentProduct==product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add To Cart"}

              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
