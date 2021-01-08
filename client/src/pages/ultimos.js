import React, { useState, useEffect } from "react";
const fetch = require('node-fetch');

export const ULTIMOS = () => {
    const [datos, setData] = useState([]);

    useEffect(() => {
        fetch('https://us-central1-usac-298718.cloudfunctions.net/redisList')
        .then(response => response.json())
        .then(data => { 
            let lista = [];
            for(let item of data){
                lista.push(JSON.parse(item))
            }
            console.log(lista)
            setData(lista.slice(lista.length -5, lista.length).reverse())
        });
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