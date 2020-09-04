import React from "react";
import './Home.scss';  
import Bowl from './flame-uploading.png'; 

export default function Home() {
  return (
    <div className="placeholder">
      <div className="image-container">
        <img src={Bowl} alt="Placeholder img" /> 
      </div>
  
      <div className="cta-startpage">
        <button type="button" onClick={()=>  window.location.href='/booking'}>Boka</button> 
      </div>
      
      
    <div className="text-container">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        laboris nisi ut aliquip ex ea commodo consequat. 
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse 
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
        cupidatat non proident, sunt in culpa qui officia deserunt mollit 
        anim id est laborum.
      </p>
    </div>


    </div>


  );
}
