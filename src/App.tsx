import React from "react";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import CreateBooking from "./components/createBooking/CreateBooking";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";


function App() {
  return (
    <div className="App">
            
      <React.Fragment>        
        <Router>           
          <div>                   
            <nav className="nav">                       
                <ul>                            
                  <li>
                    <button><Link to="/">Home</Link></button>                       
                  </li>                         
                  <li>
                    <button><Link to="/booking">Booking</Link></button>                         
                  </li>                         
                  <li>
                    <button><Link to="/admin">Admin</Link></button>                  
                  </li>                  
              </ul>              
            </nav> 
            <Switch>   
              <Route path="/home">                           
                <Home />                         
              </Route>                       
              <Route path="/booking">                           
                <CreateBooking />                     
              </Route>                    
              <Route path="/admin">                         
                <Admin />                    
              </Route>                   
              <Route path="/">                       
                <Home />                         
              </Route>                     
            </Switch>                
          </div>            
        </Router>           
      </React.Fragment>         
    </div>
  );
}
export default App;
