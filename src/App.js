import "./App.css";
import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import UserScreen from "./screens/UserScreen";
import EditUserScreen from "./screens/EditUserScreen";
// Actions
import { getUser } from "./redux/actions/userActions";

import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [sideToggle, setSideToggle] = useState(false);

  useEffect(() => {
    dispatch(getUser())
  },[dispatch])

  return (
    <>
      <Router>
      
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/user" component={UserScreen} />
          <Route exact path="/user/edit" component={EditUserScreen} />
        </Switch>
      </main>
      </Router>
    </>
  );
}

export default App;
