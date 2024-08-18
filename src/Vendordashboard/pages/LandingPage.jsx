import React ,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProducts from '../components/forms/AddProducts'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const[showlogin,setShowlogin]=useState(false)
  const[showregister,setShowregister]=useState(false)
  const[showfirm,setShowfirm]=useState(false)
  const[showproduct,setShowproduct]=useState(false)
  const[showwelcome,setShowwelcome]=useState(false)
  const[showallproducts,setShowallproducts]=useState(false)
  const[showlogout,setShowlogout]=useState(false)
  const[showfirmtitle,setShowfirmtitle]=useState(true)



  useEffect(()=>{
      const logintoken=localStorage.getItem('logintoken')

    if(logintoken){
      setShowlogout(true)
    }

  },[])

  useEffect(() => {
    const firmName = localStorage.getItem("firmName");
    if (firmName) {
      setShowfirmtitle(false);
    }
  }, []);
  

  const showloginhandler =()=>{
    setShowlogin(true)
    setShowregister(false)
    setShowfirm(false)
    setShowproduct(false)
    setShowwelcome(false)
    setShowallproducts(false)
  }
  const showregisterhandler =()=>{
    setShowregister(true)
    setShowlogin(false)
    setShowfirm(false)
    setShowproduct(false)
    setShowwelcome(false)
    setShowallproducts(false)
  }
  const showfirmhandler=()=>{
    if(showlogout){
    setShowlogin(false)
    setShowregister(false)
    setShowfirm(true)
    setShowproduct(false)
    setShowwelcome(false)
    setShowallproducts(false)
    }else{
      alert("please log-in to open");
      setShowlogin(true)
    }
  }
  const showproducthandler=()=>{
    if(showlogout){
    setShowlogin(false)
    setShowregister(false)
    setShowfirm(false)
    setShowproduct(true)
    setShowwelcome(false)
    setShowallproducts(false)
    }else{
      alert("please log-in to open");
      setShowlogin(true)
    }
  }
  const showwelcomehandler =()=>{
    setShowlogin(false)
    setShowfirm(false)
    setShowregister(false)
    setShowproduct(false)
    setShowwelcome(true)
    setShowallproducts(false)
  }
  const showallproductshandler =()=>{
    if(showlogout){
    setShowlogin(false)
    setShowregister(false)
    setShowfirm(false)
    setShowproduct(false)
    setShowwelcome(false)
    setShowallproducts(true)
    }else{
      alert("please log-in to open");
      setShowlogin(true)
    }
  }

  const logouthandler=()=>{
    confirm("Are you sure to logout ? ")
    localStorage.removeItem("logintoken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName")
    setShowlogout(false);
    setShowfirmtitle(true)

  }

  return (
   <>
        <section className='landingsection'>

            <NavBar showloginhandler={showloginhandler} showregisterhandler={showregisterhandler} showlogout={showlogout} logouthandler={logouthandler}/>
            <div className="collection">
            <SideBar showfirmhandler={showfirmhandler} showproducthandler={showproducthandler} showallproductshandler={showallproductshandler} showfirmtitle={showfirmtitle}/>
            {showlogin && <Login showwelcomehandler={showwelcomehandler}/>}
           {showregister && <Register showloginhandler={showloginhandler}/>}
           {showfirm && showlogout && <AddFirm/>}
           {showproduct && showlogout && <AddProducts/>}
           {/*{showwelcome && <Welcome/>}*/}
           {showallproducts&& showlogout && <AllProducts/>}
           </div>
        </section>
   </>
  )
}

export default LandingPage