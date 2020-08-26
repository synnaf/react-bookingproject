import React from "react";
<<<<<<< HEAD
import Home from "./components/home/Home";
import Booking from "./components/booking/Booking";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
=======
import "./App.css";
import Home from "./components/home/Home";
>>>>>>> styles

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <h1>Hej... del 2</h1>
            
      <React.Fragment>        
        <Router>           
          <div>                   
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
=======
      <Home></Home>
>>>>>>> styles
    </div>
  );
}
export default App;
