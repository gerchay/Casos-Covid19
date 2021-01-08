import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from './pages/home';
import { TOP } from './pages/top';
import { CIRCULARES } from './pages/circulares';
import { ULTIMOS } from './pages/ultimos';
import { BARRAS } from './pages/barras';
import io from "socket.io-client";
let socket;

const App = () => {
  const ENDPOINT = 'https://socket-pwrrzy4fsq-uc.a.run.app';
  socket = io(ENDPOINT);
  
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-dark bg-primary navbar-expand-sm fixed-top">
        <div className="container">
          <h3 className="navbar-brand" >Sistemas Operativos 1</h3>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                <span class="navbar-toggler-icon"></span>
            </button>

          <div className="collapse navbar-collapse" id="Navbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link" >Datos</Link>
              </li>
              <li className="nav-item">
                <Link to="/top" className="nav-link">Top 3</Link>
              </li>
              <li className="nav-item">
                <Link to="/circulares" className="nav-link">Graficas circulares</Link>
              </li>
              <li className="nav-item">
                <Link to="/casos" className="nav-link">Ultimos casos</Link>
              </li>
              <li className="nav-item">
                <Link to="/barras" className="nav-link">Graficas barras</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br/><br/><br/>
      
      <div className="container pt-4">
        <Switch>
          <Route path="/barras">
            <BARRAS />
          </Route>
          <Route path="/casos">
          <ULTIMOS />
          </Route>
          <Route path="/circulares">
            <CIRCULARES socket={ socket } />
          </Route>
          <Route path="/top">
            <TOP socket={ socket } />
          </Route>
          <Route path="/">
            <Home socket={ socket } />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>Pagina Auxiliar</h2>;
}

export default App;
