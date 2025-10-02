import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

import geoperu from '../../assets/data/dptos.json'
import MapaBase from './MapaBase'
import HomeButton from './HomeButton'
import LayerGeoJson from './LayerGeoJson'
import ComboBox from './ComboBox'

const Mapa = ({ubigeo, resetUbigeo}) => {
    const [ubigodepartamento, setUbigeodepartamento] = useState('0')
    
    const mapOptions = {
        center: [-9.189967, -75.015152],
        zoom: 5,
        maxZoom: 18,
        minZoom: 5,
        attributionControl: false,
        scrollWheelZoom: false,
    };
    const handleTodosChange = (newValue) => {
        setUbigeodepartamento(newValue);
        //console.log("Dentro del compónente Mapa newValue ", newValue)        
        resetUbigeo(newValue)
    };
    
    useEffect(() => {
        setUbigeodepartamento(ubigeo);
    }, [ubigeo])
    //console.log("Dentro del compónente Mapa ubigodepartamento ", ubigodepartamento)

    return (
        <>
        {/* <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-2 md:grid-cols-2">
            <ComboBox dataGeoJSON={geoperu} onTodosChange={handleTodosChange} ubigeoDpto={ubigodepartamento}/>            
        </div>         */}
            <MapContainer {...mapOptions}>
                <MapaBase />
                <LayerGeoJson todosDptos={geoperu} ubigeoDpto={ubigodepartamento} position={mapOptions.center} onTodosChange={handleTodosChange}/>                
                <HomeButton homeLocation={mapOptions} onTodosChange={handleTodosChange}/>
            </MapContainer>
        </>
    );
}

export default Mapa;
