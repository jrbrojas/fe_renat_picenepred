import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, GeoJSON, useMapEvents, useMap } from 'react-leaflet'

import L from 'leaflet'; 

const LayerGeoJson = ({todosDptos, ubigeoDpto, onTodosChange}) => {
    const [geoJsonKey, addToGeoJsonKey] = useState(1);
    const [mapa, setMapa] = useState();
    const map = useMap();
    const geoJsonRef = useRef(null);

    useEffect(() => {
      if (ubigeoDpto==='0') {
          setMapa(todosDptos)
          let geojsonLayer = L.geoJSON(todosDptos);
          let bounds = geojsonLayer.getBounds();
          map.fitBounds(bounds)
          //map.flyToBounds(bounds)
      }
      addToGeoJsonKey(geoJsonKey + 1)
    }, [todosDptos, ubigeoDpto]);
  
    const highlightFeature = (e) => {
      const layer = e.target;
      if (geoJsonRef.current) {
        geoJsonRef.current.resetStyle();
      }
      layer.setStyle({
        fillColor: "yellow",
        weight: 2,
        color: "white",
        fillOpacity: 0.6,
      });
      setMapa(layer.feature.properties.NOMBDEP);

      const newValue = layer.feature.properties.CCDD;
      onTodosChange(newValue);
    //  console.log("Dentro del componente LayerGeoJson", layer.feature)
    };
      
    const onEachFeature = (feature, layer) => {      
        layer.on({
          click: highlightFeature,
            mouseover: (e) => {
                layer.bindTooltip(feature.properties.NOMBDEP,{permanent:true,direction:'center', className: 'tooltip rounded shadow-lg p-1 bg-yellow-100'});   
            },
            mouseout: (e) => {
                layer.bindTooltip(null); 
            },             
        });
    };

    const styleFeature = (feature) => {
      return {
        fillColor: feature.properties.NOMBDEP === mapa ? "yellow" : "grey",
        weight: 2,
        color: "white",
        fillOpacity: 0.6,
      };
    };      
    
    return (
      <>
          { todosDptos && 
            <GeoJSON
              key={geoJsonKey}
              data={todosDptos}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          }
      </>
    )
}

export default LayerGeoJson