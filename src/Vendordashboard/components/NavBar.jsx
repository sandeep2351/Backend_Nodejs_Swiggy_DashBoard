import React from 'react'

const NavBar = ({showloginhandler,showregisterhandler,showlogout,logouthandler}) => {

  const firmname=localStorage.getItem("firmName")
  return (
    <div className="navsection">
      <div className="company">
         Vendor DashBoard
      </div>
      <div className="firmname">
        <h4>FirmName : {firmname}</h4>
      </div>
      <div className="userauth">
        {!showlogout ? <>
        <span onClick={showloginhandler}>Login /</span>
        <span onClick={showregisterhandler}>Register</span>
        </> : <span onClick={logouthandler} >Logout</span> }

      </div>
    </div>
  )
}

export default NavBar