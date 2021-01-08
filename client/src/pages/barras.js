import React, { useState, useEffect } from "react";
import { CanvasJSChart } from 'canvasjs-react-charts'; 
const fetch = require('node-fetch');


export const BARRAS = () => {
    const [datos, setData] = useState([]);

    useEffect(() => {
        fetch('https://us-central1-usac-298718.cloudfunctions.net/redisList')
        .then(response => response.json())
        .then(data => { 
            let lista = [];
            for(let item of data){
                lista.push(JSON.parse(item))
            }

            let b = new Map();


            for(let item of lista){
                if(b.has(String(item.age))){
                    let count = b.get(String(item.age));
                    count++;
                    b.set(String(item.age), count)
                }else{
                    b.set(String(item.age), 1);
                }
            }

            let barras = [];

            for (var [clave, valor] of b) {
                barras.push({x: Number(clave), y: Number(valor)});
            }
            setData(barras)
            console.log(barras)
        });
    }, []);

    const optionsAge = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Infectados por rango de edad"
        },
        data: [{
            type: "column",
            dataPoints: datos
        }]
    }

    return (
        <div className="col-md-10 offset-1 mt-4 mb-4" >
            <CanvasJSChart options={ optionsAge } />
        </div>
    );
}