import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
//import { Login } from "./components/Login";
import { Plantas_medicinales } from "./components/Plantas_medicinales";
import { Geolocalizacion } from "./components/Geolocalizacion/Geolocalizacion";
import { Login } from "./components/Login";
import { PlantaSingle } from "./components/information/PlantaSingle";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Navbar />
        <Switch>
          <div className="container p-4">
            <Route path="/Users" component={Users} />

            <Route path="/About" component={About} />
            <Route path="/planta_medicinal/:plantaId" component={PlantaSingle} />
            <Route
              path="/Plantas_medicinales"
              component={Plantas_medicinales}
            />
            <Route path="/Geolocalizacion" component={Geolocalizacion} />
            <Route path="/Login" component={Login} />
          </div>
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

/*function App() {
  return (
    <BrowserRouter>
      <Router>
        <Login/>

      </Router>
    </BrowserRouter>
  );
}*/
export default App;
