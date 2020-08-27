import React from "react";
import axios from 'axios';
import './Admin.scss'; 

export default function Admin() {

  axios.get('localhost:3001/bookings/').then
        (data => {
            console.log(data);
        })

  return (
    <div className="main-container">
      <div className="placeholder">Admin Works</div>
    </div>
  );
}
