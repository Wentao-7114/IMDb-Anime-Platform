import React from 'react';
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';

 

function Aboutme() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let location = useLocation();
  const username = location.state.currentusername;
  const password = location.state.currentpassword;




  
 
  return (
    <div>
      <Navbar value={{currentusername:username, currentpassword:password}}></Navbar>  
      <h1> {username} </h1>
    </div>
  );
}

export default Aboutme;