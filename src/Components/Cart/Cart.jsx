import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Await, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartDetails,
    deleteCartItems,
    clearCartItems,
  } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [ResponseDetails, setResponseDetails] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();

    console.log(response.data);

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setResponseDetails(response.data);
    }
  }

  async function updateProducts(id, count) {
    let response = await updateCartDetails(id, count);

    //  console.log(response.data);

    if (response.data.status == "success") {
      toast.success("Product Updated Successfully");
      setCartDetails(response.data.data);
      setResponseDetails(response.data);
    } else {
      toast.error("error when Updated ");
    }
  }

  async function deleteItem(id) {
    let response = await deleteCartItems(id);

    console.log(response.data);

    if (response.data.status == "success") {
      toast.success("Deleted Item");
      toast.success("Product Updated Successfully");
      setCartDetails(response.data.data);
      setResponseDetails(response.data);
    } else {
      toast.error("error when Updated ");
    }
  }

  async function clear() {
    let response = await clearCartItems();

    console.log(response.data.message);

    if (response.data.message == "success") {
      toast.success("Empty Cart . . ");
      setCartDetails(response.data.data);
      setResponseDetails(response.data);
    } else {
      toast.error("error when Updated ");
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (CartDetails?.products.length == 0) {
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
        {CartDetails?.products.length > 0 ? (
          <>
            <div className="bg-white w-[50%] m-auto my-4 rounded-2xl capitalize border border-emerald-300">
              <h2 className="capitalize">
                total cart price = {CartDetails?.totalCartPrice}
              </h2>
              <p>total cart items = {ResponseDetails?.numOfCartItems}</p>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-slate-300">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CartDetails?.products.map((product) => (
                    <tr
                      key={product.product.id}
                      className="bg-slate-200 border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateProducts(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  "
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span className="text-gray-900 font-semibold">
                              {product.count}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              updateProducts(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => deleteItem(product.product.id)}
                          className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <button
                onClick={() => clear()}
                className="bg-red-700 text-white px-4 py-2 rounded-2xl me-10"
              >
                <i className="fa-solid fa-trash me-2"></i>clear cart
              </button>
  
              <Link to={"/checkout"}>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-2xl">
                Check Out
              </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </>
        )}
      </>
    );
  }


}
