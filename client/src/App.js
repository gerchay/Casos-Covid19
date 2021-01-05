import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from './pages/home';
import { TOP } from './pages/top';
import { CIRCULARES } from './pages/circulares';
import io from "socket.io-client";
let socket;

const App = () => {
  const ENDPOINT = 'localhost:5000';
  socket = io(ENDPOINT);
  
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <h3 className="navbar-brand" >Sistemas Operativos 1</h3>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
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
      
      <div className="container pt-4">
        <Switch>
          <Route path="/barras">
            <About />
          </Route>
          <Route path="/casos">
            <About />
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
