import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import axios from 'axios';
import { Link } from 'react-router-dom';




export default function Categories() {


 const [Categories, setCategories] = useState();

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
      })
      .catch((res) => {
        // console.log(res);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
   

       <div className="row">
        {Categories?.length>0 ? (
          Categories?.map((category) => (
            <div key={category._id} className="xl:w-1/6 md:w-1/3 lg:w-1/4  p-2">
              <div className="brand p-2 brandbtn relative overflow-hidden  border-zinc-300 rounded-2xl border-solid border-opacity-70 border-4">
                <img
                  className="w-full object-cover  h-[220px]"
                  src={category.image}
                  alt=""
                />
                <h3>{category.name}</h3>
                <Link  to={`/categories/${category._id}/${category.name}`}>
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
