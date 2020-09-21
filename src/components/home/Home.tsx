import React from "react";
import "./Home.scss";
import Bowl from "./new-gallery-1.jpg";
import Chef from "./sushi.jpg";
import Illustration from "./flame-uploading.png";

export default function Home() {
  return (
    <div className="start-page">
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
    </div>
  );
}
