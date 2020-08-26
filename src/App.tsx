import React from "react";
import Home from "./components/home/Home";
import Booking from "./components/booking/Booking";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="App">
            
      <React.Fragment>        
        <Router>           
<<<<<<< HEAD
          <div>                   
            <nav className="nav">                       
                <ul>                            
                  <li>
                    <button><Link to="/">Home</Link></button>                       
                  </li>                         
                  <li>
                    <button><Link to="/booking">Bookings</Link></button>                         
                  </li>                         
                  <li>
                    <button><Link to="/admin">Admin</Link></button>                  
                  </li>                  
=======
          <div className="menu">                   
            <nav>                       
              <ul>                            
                <li>
                   <Link to="/">Home</Link>                             
                </li>                         
                <li>
                   <Link to="/booking">Bookings</Link>                          
                </li>                         
                <li>
                   <Link to="/admin">Admin</Link>                      
                </li>                  
>>>>>>> c2a36856507811d8b0f1c351fe8c6bca5fe7911e
              </ul>              
            </nav> 
            <Switch>   
              <Route path="/home">                           
                <Home />                         
              </Route>                       
              <Route path="/booking">                           
                <Booking />                      
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
