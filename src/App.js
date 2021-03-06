import React from "react";
import "./App.css";
import {Route} from "react-router-dom";
import Home from "./components/Home.js";
import Form from "./components/Form";


const App = () => {
  return (
    <>
      <Route exact path= "/">
        <Home/>
      </Route>

      <Route exact path= "/Form">
        <Form/>
      </Route>  
    </>
  );
};
export default App;
