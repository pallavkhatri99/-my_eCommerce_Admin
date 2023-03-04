import React, { useState } from "react";
import '../style/add.css'
import '../style/product.css'
import axios from "axios";
import { getAxios } from "../useAxios/useAxios";
function Product() {
  const categoryArray = ["Select","Electronic","Application","Fashion","Home","Grocery","Toys"];
  const [response,setResponse] = useState({})
  const [productData,setProductData] = useState([])
  const getProductData = async () => {
    await getAxios(`/product?category=${document.getElementById('category').value}`)
    .then((data)=>{setResponse(data);setProductData(data.data);})
    .catch((err)=>console.log(err))
 }
  console.log(productData)
  return (
    <>
    <div className="btn">
    <select className="category" name="category" id="category" style={{"width": "15%","fontSize": "21px"}}>
      {categoryArray.map(ele=><option value={ele}>{ele}</option>)}
    </select>
      <button className="m_btn" onClick={getProductData}>Get Products</button>
    </div>
    <div className="container">
    <div className="row">
            <div className="col">Product Image</div>
            <div className="col">Product Name</div>
            <div className="col">Product Category</div>
            <div className="col">Product Type</div>
            <div className="col">Product Price</div>
            <div className="col"></div>
    </div>
      {productData.length == 0 ? "":
        productData.map((products)=>
          <>
          <div className="row">
            <div className="col"><img src={products.image} style={{"width":"100px"}}/></div>
            <div className="col">{products.name}</div>
            <div className="col">{products.category}</div>
            <div className="col">{products.type}</div>
            <div className="col">{products.price}</div>
            <div className="col">
                <button className="m_btn">Edit</button>
            </div>
          </div>
          </>
        )
      }
    </div>

    </>
  )
}

export default Product;