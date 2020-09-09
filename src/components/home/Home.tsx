import React from "react";
import "./Home.scss";
import Bowl from "./new-gallery-1.jpg";
import Chef from "./sushi.jpg";
import Illustration from "./flame-uploading.png";

export default function Home() {
  return (
    <div className="placeholder">
      <div className="image-container">
        <img src={Bowl} alt="Bowl of ramen" className="ramen" />
        <img src={Chef} alt="Sushi chef" className="chef" />
      </div>

      <div className="text-container">
        <img src={Illustration} alt="illustration" />
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
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
  );
}
