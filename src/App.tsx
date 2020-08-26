import React from 'react';
import Home from './components/home/Home';
import Booking from './components/booking/Booking';
import Admin from './components/admin/Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Home></Home>>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/booking">Bookings></Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </React.Fragment>
   
    </div>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

// function Booking() {
//   return <h2>Bookings</h2>;
// }

// function Admin() {
//   return <h2>Admin</h2>;
// }
export default App;

