import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './pages.css';
import { GRAFLOCATION } from './circulares/location'; 
import { GRAFSTATE } from './circulares/state'; 
import { GRAFTYPE } from './circulares/type'; 
import { GRAFAGE } from './circulares/age'; 

export const CIRCULARES = ( { socket }) => {

    return (
        <Router>
            <div className="row" >
                <div className="col-md-3">
                    <button type="button" className="btn btn-success">
                        <Link to="/circulares" className="link">Ubicacion</Link>
                    </button> 
                </div>
                <div className="col-md-3">
                    <button type="button" className="btn btn-info">
                        <Link to="/circulares/grafEstado" className="link">Estado</Link>
                    </button> 
                </div>
                <div className="col-md-3">
                    <button type="button" className="btn btn-warning">
                        <Link to="/circulares/grafTipo" className="link">Tipo</Link>
                    </button> 
                </div>
                <div className="col-md-3">
                    <button type="button" className="btn btn-danger">
                        <Link to="/circulares/grafAge" className="link">Años</Link>
                    </button> 
                </div>
            </div>

            <div className="container pt-3 ">
                <Switch>
                    <Route path="/circulares/grafEstado">
                        <GRAFSTATE socket={socket} />
                    </Route>
                    <Route path="/circulares/grafTipo">
                        <GRAFTYPE socket={socket} />
                    </Route>
                    <Route path="/circulares/grafAge">
                        <GRAFAGE socket={socket} />
                    </Route>
                    <Route path="/">
                        <GRAFLOCATION socket={socket} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
