import React from "react";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import CreateBooking from "./components/createBooking/CreateBooking";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import OneBooking from "./components/oneBooking/OneBooking";
import DeletedBooking from "./components/deletedBooking/DeletedBooking";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="navbar">
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>             
              </li>
                     
              <li>
                  <Link to="/booking">Booking</Link>             
              </li>
                          
              <li>
                <Link to="/admin">Admin</Link>             
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/home">
              <Home />           
            </Route>
            <Route path="/booking/:bookingId">
              <OneBooking />
            </Route>
            <Route path="/delete/:bookingId">
              <DeletedBooking />
            </Route>
            <Route path="/booking">
              <CreateBooking />            
            </Route>
            <Route path="/admin">
              <Admin />           
            </Route>
            <Route exact path="/">
              <Home />           
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}
export default App;
