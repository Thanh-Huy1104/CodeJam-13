import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import MapStyles from '../assets/MapStyles.json';
import markerIcon from '../assets/map-marker.png';
import truckIcon from '../assets/truck-icon.svg';

const mapOptions = {
  mapTypeControl: false,
  styles: MapStyles
};

function MapScreen({ center, zoom, origin, destination, trucks }) {
  const [directions, setDirections] = useState(null);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const [truckArray, setTruckArray] = useState([]);

  useEffect(() => {
    if (isMapsLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(destination.lat, destination.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      setTruckArray(trucks);
    }
  }, [origin, destination, isMapsLoaded, trucks]);

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
          zoom={4}
          options={mapOptions}
        >

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                zoom: 12,
                polylineOptions: {
                  strokeColor: '#02B528',
                  strokeOpacity: 0.4,
                  strokeWeight: 5,
                },
                markerOptions: {
                  icon: {
                    url: markerIcon,
                    scaledSize: new window.google.maps.Size(40, 40),
                  },
                },
              }}
            />
          )}
          
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

export default MapScreen;
