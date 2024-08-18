import React from 'react'

const SideBar = ({showfirmhandler,showproducthandler,showallproductshandler,showfirmtitle}) => {
  return (
    <div className="sidebar">
        <ul>
          {showfirmtitle ? <li onClick={showfirmhandler}>Add Firm</li> : ""}
            <li onClick={showproducthandler}>Add Products</li>
            <li onClick={showallproductshandler}>All Products</li>
            <li>User Details</li>
        </ul>

    </div>
  )
}

export default SideBar