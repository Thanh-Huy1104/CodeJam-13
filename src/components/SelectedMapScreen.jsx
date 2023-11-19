import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import MapStyles from '../assets/MapStyles.json';
import markerIcon from '../assets/map-marker.png';
import truckIcon from '../assets/truck-icon.svg';

const mapOptions = {
  mapTypeControl: false,
  styles: MapStyles
};

function SelectedMapScreen({ center, zoom, truck }) {
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const [truckArray, setTruckArray] = useState([]);

  useEffect(() => {
    if (isMapsLoaded) {
      setTruckArray(truck);
    }
  }, [isMapsLoaded, truck]);

  const handleLoad = () => {
    setIsMapsLoaded(true);
  };

  return (
    <div className='map-screen'>
      <LoadScript
        googleMapsApiKey="AIzaSyD9tAFBsLY-TJV21XT2O9UtxxSOTYFqYSw"
        onLoad={handleLoad}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={12}
          options={mapOptions}
        >
          
          {truckArray && (truckArray.map(truck => {
            return (
              <Marker
                styles={{ with: 30, height: 30 }}
                key={truck.truckId}
                position={{ lat: truck.positionLatitude, lng: truck.positionLongitude }}
                icon={{
                  url: truckIcon,
                  scaledSize: new window.google.maps.Size(60, 60),
                  anchor: new window.google.maps.Point(20, 40),
                }}
                >
              </Marker>
            );
          })
          )}

        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default SelectedMapScreen;
