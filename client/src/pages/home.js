import React, { useState, useEffect } from "react";

export const Home = ( { socket }) => {
    const [datos, setDatos] = useState([]);
    
    useEffect(() => {
      socket.on("Infectados", data =>  setDatos(data) );
  
    }, []);
  
    return (
        <div className="row pt-4" >
            <table className="table table-hover">
                    <thead>
                        <tr className="table-info">
                        <th scope="col">Nombre</th>
                        <th scope="col">Ubicación</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos.map( ( user ,i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{ user.name }</th>
                                        <th >{ user.location }</th>
                                        <th >{ user.age }</th>
                                        <th >{ user.infected_type }</th>
                                        <th >{ user.state }</th>
                                    </tr>
                                );
                            }) 
                        }
                        
                    </tbody>
                </table>
        </div>
    );
}
