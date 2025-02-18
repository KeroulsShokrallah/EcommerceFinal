import React, { useContext } from "react";
import style from "./Home.module.css";
import { CounterContext } from "../../Context/CounterContext";
import RecentProducts from "./../RecentProducts/RecentProducts";
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from './../MainSlider/MainSlider';


export default function Home() {
  let { Counter, changeCounter } = useContext(CounterContext);

  return (
    <>
    <MainSlider />
    <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
