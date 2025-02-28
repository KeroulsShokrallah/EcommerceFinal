import React, { useEffect, useState } from "react";
import style from "./Allorders.module.css";
import axios from "axios";

export default function Allorders() {
  const [Allorders, setAllorders] = useState([]);

  async function getAllOrders() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/`
    );
    console.log(data.data);
    setAllorders(data.data);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {Allorders?.map((order) => (
        <div className="py-5 mb-5 rounded border border-black">
          <div className="flex justify-between px-3">
            <div>
              <h2>Order ID</h2>
              <span className="font-bold">#{order.id}</span>
            </div>
            <div className="flex ">
              <span
                className={
                  order.isPaid
                    ? `bg-emerald-300 rounded-xl px-4 py-2 me-2`
                    : `bg-red-300 rounded-xl px-4 py-2 me-2`
                }
              >
                {order.isPaid ? "تم الدفع" : " قيد الدفع"}
              </span>
              <span
                className={
                  order.isDelivered
                    ? `bg-emerald-300 rounded-xl px-4 py-2 me-2`
                    : `bg-red-300 rounded-xl px-4 py-2 me-2`
                }
              >
                {order.isDelivered ? "تم التوصيل" : " قيد التوصيل"}
              </span>
            </div>
          </div>
          <div className="row">
            {order.cartItems.map((item) => (
              <div className="xl:w-1/6 md:w-1/3 lg:w-1/4 flex my-3">
                <div className="item me-2 rounded border border-black">
                  <img
                    className="w-full"
                    src={item.product.imageCover}
                    alt=""
                  />
                  <div>
                    <h4 className="text-start ms-8">{item.product.title.split(" ").slice(0,2).join(" ")}</h4>
                    <div className="flex justify-between px-4">
                      <h4 className="text-left ms-5">
                        {" "}
                        <span className="font-bold ">Count: </span>
                        <span className="text-emerald-500">
                          {item.count}
                        </span>{" "}
                      </h4>
                      <h4 className="text-emerald-500">{item.price} LE</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h4 className="text-left ms-5">
            {" "}
            <span className="font-bold ">Your Total Order Price is: </span>
            <span className="text-emerald-500">
              {order.totalOrderPrice}
            </span>{" "}
          </h4>
        </div>
      ))}
    </>
  );
}
