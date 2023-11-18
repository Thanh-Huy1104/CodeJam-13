import { useState, useEffect } from 'react'
import MapScreen, { Sidebar, WebSocketListener } from './components'
import './App.css'
import Lottie from 'lottie-react';
import animationData from './assets/truck-anim.json';

const Load1 = {
  "seq": 3,
  "type": "Load",
  "timestamp": "2023-11-17T11:31:35.0481646-05:00",
  "loadId": 101,
  "originLatitude": 39.531354,
  "originLongitude": -87.440632,
  "destinationLatitude": 37.639,
  "destinationLongitude": -121.0052,
  "equipmentType": "Van",
  "price": 3150.0,
  "mileage": 2166.0
}
const Load2 = {
  "seq": 4,
  "type": "Load",
  "timestamp": "2023-11-17T11:55:11.2311956-05:00",
  "loadId": 201,
  "originLatitude": 41.621465,
  "originLongitude": -83.605482,
  "destinationLatitude": 37.639,
  "destinationLongitude": -121.0052,
  "equipmentType": "Van",
  "price": 3300.0,
  "mileage": 2334.0
}
const Load3 = {
  "seq": 3,
  "type": "Load",
  "timestamp": "2023-11-17T11:31:35.0481646-05:00",
  "loadId": 102,
  "originLatitude": 39.531354,
  "originLongitude": -87.440632,
  "destinationLatitude": 37.639,
  "destinationLongitude": -121.0052,
  "equipmentType": "Van",
  "price": 3150.0,
  "mileage": 2166.0
}

const trucks = [
  {
    "seq": 5,
    "type": "Truck",
    "timestamp": "2023-11-17T16:40:32.7200171-05:00",
    "truckId": 114,
    "positionLatitude": 40.32124710083008,
    "positionLongitude": -86.74946594238281,
    "equipType": "Van",
    "nextTripLengthPreference": "Long"
  },
  {
    "seq": 2,
    "type": "Truck",
    "timestamp": "2023-11-17T09:10:23.2531001-05:00",
    "truckId": 346,
    "positionLatitude": 39.195726,
    "positionLongitude": -84.665296,
    "equipType": "Van",
    "nextTripLengthPreference": "Long"
  },
];


function App() {
  const [mapCenter, setMapCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [mapZoom, setMapZoom] = useState(10);
  const [selectedLoad, setSelectedLoad] = useState(Load1);

  const handleLoadSelect = (Load) => {
    console.log('Load selected:', Load);
    setSelectedLoad(Load);
    setMapCenter({ lat: Load.originLatitude, lng: Load.originLongitude });
    setMapZoom(15); // Adjust the zoom level as needed
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., fetch data here)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);



  if (loading) {
    return <div className='items-center justify-center w-full h-full'><Lottie loop={true}
      style={{
        width: '500px',
        height: '500px',
        margin: 'auto',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
      }}
      animationData={animationData} />
    </div>
  }

  return (
    <div>
      <WebSocketListener />
      <Sidebar onLoadSelect={handleLoadSelect} loads={[Load1, Load2, Load3]} trucks={trucks} />
      {selectedLoad && (
        <MapScreen
          center={mapCenter}
          zoom={mapZoom}
          origin={{ lat: selectedLoad.originLatitude, lng: selectedLoad.originLongitude }}
          destination={{ lat: selectedLoad.destinationLatitude, lng: selectedLoad.destinationLongitude }}
          trucks={trucks}
        />
      )}
    </div>
  );
}

export default App;