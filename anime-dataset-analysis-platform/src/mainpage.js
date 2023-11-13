 
import './mainpage.css'; 
import React from 'react';  
import { BrowserRouter,  Routes, Route,  Link  } from 'react-router-dom';
 
import Searching from './Searching';
import Aboutme from './Aboutme';


function mainpage() {
 
     
 
  return (
 
      <div className="App">
        <div className='Header'>
          <h1>Your Homepage</h1>
          <p>(Click on Searching or Aboutme to start your exploration!)</p>
        </div>
        <nav className="Nav">
          <ul>
            <li ><Link to="/Searching">Searching</Link></li>
            <li><Link to="/Aboutme">Aboutme</Link></li>
          </ul>
        </nav>

   
          
      
      </div>
          

 
    
  );
} 


export default mainpage;  
 