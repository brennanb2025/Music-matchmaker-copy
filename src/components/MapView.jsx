import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function MapView({ location }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyADb9du1fY0dHbPcWtcGSkOs2VfEn1rBQg"
  });

  //format center 
  const parsedCenter = {"lat":parseFloat(location.latitude), "lng":parseFloat(location.longitude)};

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(15);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={parsedCenter}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker key={"only one marker"} position={parsedCenter} />
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapView);