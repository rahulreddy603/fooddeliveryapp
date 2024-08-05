
import { useState } from "react";
import { LOGO_URL } from "../utils/constant.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Header = () => {

  const [btnNameReact, setbtnNameReact] = useState("login");

  const onLineStatus = useOnlineStatus();
   
 

  return (
    <div className="flex  bg-pink-100   justify-between">
      <div className='my-4  mx-9'>
        <img className='w-44 h-20' src={LOGO_URL} alt="Logo" />
      </div>
      <div className='flex items-center'>
        <ul className=" flex   justify-between  ">
          <li>onLineStatus:{onLineStatus ?"true": "false"}</li>
          <li><Link to="/" className="px-10">Home</Link></li>
          <li><Link to="/about" className="px-10">About us</Link></li>
          <li><Link to="/contact" className="px-10">Contact us</Link></li>
          <li><Link to="/Groceries" className="px-10">Groceries</Link></li>
          <li className="card">Card</li>
          <button className="px-10" onClick={() => {
           btnNameReact=== "login"? 
           setbtnNameReact("logout"):
           setbtnNameReact("login");
            
          }}>{btnNameReact}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
