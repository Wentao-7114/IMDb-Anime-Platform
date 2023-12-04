import './mainpage.css'; 
import React from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

function mainpage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let location = useLocation();
  const username = location.state.currentusername;
  const password = location.state.currentpassword;
   
 
  return (
 
      <div className="App">
        <Navbar value={{currentusername:username, currentpassword:password}}></Navbar>
        <div className='Header'>
          <h1>Your Homepage</h1>
          <p>(Click on Searching or Aboutme to start your exploration!)</p>
          <Link to="/ ">Log out</Link>
        </div>
      </div>
    
  );
} 


export default mainpage;  
 