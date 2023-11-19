import { useState, useEffect } from 'react'
import MapScreen, { Sidebar, SelectedMapScreen } from './components'
import './App.css'
import Lottie from 'lottie-react';
import animationData from './assets/truck-anim.json';


const initialSelectedTruck = null;

function App() {
  const [mapCenter, setMapCenter] = useState({ lat: 37.0902 , lng: -95.7129 });
  const [mapZoom, setMapZoom] = useState(3);
  const [selectedTruck, setSelectedTruck] = useState(initialSelectedTruck);
  const [loading, setLoading] = useState(true);
  const [loads, setLoads] = useState([]);
  const [trucks, setTrucks] = useState([]);

  const serverUrl = 'ws://localhost:8765';
  const [selectedLoad, setSelectedLoad] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(serverUrl);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
    
      if (message.type === 'Load') {
        setLoads(prevLoads => {
          // Check if the load already exists in the array
          const existingLoadIndex = prevLoads.findIndex(load => load.loadId === message.loadId);
          if (existingLoadIndex >= 0) {
            // Update the existing load object
            return prevLoads.map((load, index) => {
              if (index === existingLoadIndex) {
                return { ...load, ...message };
              }
              return load;
            });
          } else {
            // Add the new load object
            return [...prevLoads, message];
          }
        });
      } else if (message.type === 'Truck') {
        // Existing truck logic...
        setTrucks(prevTrucks => {
          const existingTruckIndex = prevTrucks.findIndex(truck => truck.truckId === message.truckId);
          if (existingTruckIndex >= 0) {
            return prevTrucks.map((truck, index) => {
              if (index === existingTruckIndex) {
                return { ...truck, ...message };
              }
              return truck;
            });
          } else {
            return [...prevTrucks, message];
          }
        });
      }
    };
    

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
    
  }, []);

  const handleTruckSelect = (truck) => {
    setSelectedTruck(truck);
    console.log('Truck selected:', selectedTruck);
    setSelectedLoad(null); // Deselect the selected load
    setMapCenter({ lat: truck.positionLatitude, lng: truck.positionLongitude });
    setMapZoom(7);
  };
  
  const handleLoadSelect = (Load) => {
    console.log('Load selected:', Load);
    setSelectedLoad(Load);
    setSelectedTruck(initialSelectedTruck); // Deselect the selected truck
    setMapCenter({ lat: Load.originLatitude, lng: Load.originLongitude });
  };

  useEffect(() => {
    // Simulate loading (e.g., fetch data here)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='items-center justify-center w-full h-full'>
        <Lottie
          loop={true}
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
          animationData={animationData}
        />
      </div>
    );
  }

  return (
    <div>
      <Sidebar onLoadSelect={handleLoadSelect} onTruckSelect={handleTruckSelect} loads={loads} trucks={trucks} />
      {(selectedLoad || selectedTruck === null) && (
        <MapScreen
        center={mapCenter}
        zoom={mapZoom}
        origin={{
          lat: selectedLoad ? selectedLoad.originLatitude : (selectedTruck ? selectedTruck.positionLatitude : 0),
          lng: selectedLoad ? selectedLoad.originLongitude : (selectedTruck ? selectedTruck.positionLongitude : 0)
        }}
        destination={{
          lat: selectedLoad ? selectedLoad.destinationLatitude : (selectedTruck ? selectedTruck.positionLatitude : 0),
          lng: selectedLoad ? selectedLoad.destinationLongitude : (selectedTruck ? selectedTruck.positionLongitude : 0)
        }}
        trucks={trucks}
      />
      )}
      {selectedTruck !== null && (
        <SelectedMapScreen
          center={{ lat: selectedTruck.positionLatitude, lng: selectedTruck.positionLongitude }}
          zoom={mapZoom}
          truck={[selectedTruck]} // Render only the selected truck
        />
      )}
    </div>
  );
}

export default App;
