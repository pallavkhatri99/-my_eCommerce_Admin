import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/product.css'
import axios from "axios";
import { getAxios } from "../useAxios/useAxios";

function Product(props) {
  const navigate = useNavigate();
  const [rowcount,setRowCount] = useState({min:0,max:5});
  const categoryArray = ["Select","Electronic","Application","Fashion","Home","Grocery","Toys"];
  const [response,setResponse] = useState({})
  const [productData,setProductData] = useState([])
  const getProductData = async () => {
    await getAxios(`/product?category=${document.getElementById('category').value}`)
    .then((data)=>{setRowCount({min:0,max:5});setResponse(data);setProductData(data.data);})
    .catch((err)=>console.log(err))
 }
 const edit = (id)=>{
  props.setEditID({id:id,category:document.getElementById('category').value})
  navigate("/add")
 }
  console.log(productData)

  return (
    <>
    <div className="D-btn">
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
        productData.map((products,index)=>{
        return index < rowcount.max && index >= rowcount.min  ? (<>
          <div className="row">
            <div className="col"><img src={products.image} style={{"width":"100px"}}/></div>
            <div className="col">{products.name}</div>
            <div className="col">{products.category}</div>
            <div className="col">{products.type}</div>
            <div className="col">{products.price}</div>
            <div className="col">
                <button className="m_btn" onClick={()=>edit(products._id)} >Edit</button>
            </div>
          </div>
          </>):""}
        )
      }
      <div className="bottom_btn">
            {rowcount.min == 0 ? <div></div> : <button className="m_btn" onClick={()=>setRowCount({min:rowcount.min-5,max:rowcount.max-5})}>Previous</button>}
            {productData.length!= 0 ? <p>Total Products Count: <span>{productData.length}</span></p> : <div></div>}
            {rowcount.max > productData.length ? <div></div> : <button className="m_btn" onClick={()=>setRowCount({min:rowcount.max,max:rowcount.max+5})}>Next</button>}
          </div>
    </div>

    </>
  )
}

export default Product;