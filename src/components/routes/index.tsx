import React from "react";
import {Routes, Route} from "react-router-dom";
import CartPage from  '../cartpage'
import ProductPage from "../productpage";
const Index = () =>{
    return(
        <Routes>
            <Route path="/" element ={<ProductPage/>}/>
            <Route path="/cart" element ={<CartPage/>}/>
        </Routes>
    )
}
export default Index;