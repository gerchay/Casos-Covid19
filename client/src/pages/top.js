import React, { useState, useEffect } from "react";

export const TOP = ( { socket }) => {
    const [top, setTop] = useState([]);

    useEffect(() => {
      socket.on("top3", data =>  setTop(data) );
    }, []);

    return (
        <div className="row pt-4" >
            <table className="table table-hover">
                    <thead>
                        <tr className="table-success">
                        <th scope="col">#</th>
                        <th scope="col">Ubicación</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            top.map( ( lugares ,i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{ i+1 }</th>
                                        <th >{ lugares._id }</th>
                                        <th >{ lugares.count }</th>
                                    </tr>
                                );
                            }) 
                        }
                        
                    </tbody>
                </table>
        </div>
    );
}