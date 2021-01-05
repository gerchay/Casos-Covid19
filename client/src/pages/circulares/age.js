import React, { useState, useEffect } from "react";
import { CanvasJSChart } from 'canvasjs-react-charts'; 

export const GRAFAGE = ( { socket }) => {
    const [age, setAge] = useState([]);

    useEffect(() => {

        socket.on("grafAge", data =>  {

            let total = 0;
            data.forEach( element => { total = total + element.count; });

            let aux = []
            data.forEach( element => {  
                const ope = (element.count/total)*100;
                aux.push({ y: parseInt( ope.toFixed(2) , 10) , label: element._id }) 
            });
            setAge(aux);
        } );
        
    }, []);

    const optionsAge = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Porcentaje por Edad"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 12,
            indexLabel: "{label} - {y}%",
            dataPoints: age
        }]
    }

    return (
        <div className="col-md-10 offset-1 mt-4 mb-4" >
            <CanvasJSChart options={ optionsAge } />
        </div>
    );
}
