import React from "react"

import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IconLocation } from "./IconLocation"

export const Geolocalizacion = () => {
    const position = [-17.89650, -65.04534]
    //const position1 = [-17.89667, -65.03217]

    
    return (
        <Map className="map"
        center={position}
        zoom = {10}
        style = {{height: 500, width: "100%"}}
        >
            <TileLayer 
        
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} icon = {IconLocation}>
                
                <Popup>
                    Arrayan <br/> -17.89650, -65.04534
                    latitud
                    longitud
                </Popup>
            </Marker>

        </Map>
    );

}

export default Geolocalizacion;

