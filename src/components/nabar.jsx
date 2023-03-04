import React from "react";
import { Link } from "react-router-dom";
import '../style/nav.css';

function Nabar() {
  return (
    <>
        <div className="nav">
            <div className="nav-item">
                <h1>Welcome to best<span>Deal</span>.com Admin page</h1>
            </div>
            <div className="nav-item">
              <Link to="/product"><div className="nav-link">Product</div></Link>
              <Link to="/add"><div className="nav-link">Add Product</div></Link>
            </div>
        </div>
    </>
  )
}

export default Nabar