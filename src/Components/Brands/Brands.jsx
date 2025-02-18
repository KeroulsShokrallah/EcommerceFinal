import React from "react";
import style from "./Brands.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Brands() {
  const [Brands, setBrands] = useState([]);

  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        console.log(res);
        setBrands(res.data.data);
      })
      .catch((res) => {
        // console.log(res);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <div className="row">
        {Brands.length>0 ? (
          Brands?.map((brands) => (
            <div key={brands._id} className="xl:w-1/6 md:w-1/3 lg:w-1/4  ">
              <div className="brand p-2 brandbtn relative overflow-hidden">
                <img
                  className="  border-zinc-300 rounded-2xl border-solid border-opacity-70 border-4"
                  src={brands.image}
                  alt=""
                />
                <Link  to={`/brands/${brands._id}/${brands.name}`}>
                  <button className="bg-green-600 rounded-2xl px-4 py-2 font-semibold absolute top-[150%]">
                    show
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) :(
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
