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

      </div>
        {/* <img src={Bowl} alt="Bowl of ramen" className="ramen" /> */}
          <div className="cta-startpage">
            <button
              type="button"
              onClick={() => (window.location.href = "/booking")}
            >
              Boka
            </button>
          </div>
        {/* <img src={Chef} alt="Sushi chef" className="chef" /> */}
        <div className="detail">

        </div>
      </div>
    </div>
  );
}
