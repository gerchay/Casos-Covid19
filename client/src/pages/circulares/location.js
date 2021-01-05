import React, { useState, useEffect } from "react";
import { CanvasJSChart } from 'canvasjs-react-charts';

export const GRAFLOCATION = ( { socket }) => {
    const [location, setLocation] = useState([]);

    useEffect(() => {

        socket.on("grafLocation", data =>  {

            let totalLocat = 0;
            data.forEach( element => { totalLocat = totalLocat + element.count; });

            let aux = []
            data.forEach( element => {  
                const ope = (element.count/totalLocat)*100;
                aux.push({ y: parseInt( ope.toFixed(2) , 10) , label: element._id }) 
            });
            setLocation(aux);
        } );

    }, []);

    const optionsLocat = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Porcentaje Ubicación"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 14,
            indexLabel: "{label} - {y}%",
            dataPoints: location
        }]
    }

    return (
        <div className="col-md-10 offset-1 mt-4 mb-4" >
            <CanvasJSChart options={ optionsLocat } />
        </div>
    );
}
