import React from "react";
import "./Home.scss";
import { Spring } from "react-spring/renderprops";
// import {useSpring, animated} from 'react-spring'; 

export default function Home() {


  return (
    <>
  
    <Spring
    from={{opacity: 0}}
    to={{ opacity: 1}}
    config={{delay: 300, duration: 700}}
    >  
      {props => (
        <div className="start-page" style={props}>
          <div className="image-container">
            <div className="detail">
              <div className="small-detail" id="wasabi-1"></div>
              <div className="small-detail" id="cucumber-1"></div>
              <div className="small-detail" id="ginger-1"></div>

              <div className="small-detail" id="wasabi"></div>
              <div className="small-detail" id="ginger"></div>
              <div className="small-detail" id="cucumber"></div>
              
            </div>
            <div className="sushi">
              <div className="sushi-filling"></div>
            </div>
          </div>
          <div className="main-text-container">
            <h1>Välkommen! </h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="cta-startpage">
                    <button
                      type="button"
                      onClick={() => (window.location.href = "/booking")}
                    >
                      Boka
                    </button>
                </div>
          </div>
        </div>
      )}
    </Spring>
    </>
  );
}
