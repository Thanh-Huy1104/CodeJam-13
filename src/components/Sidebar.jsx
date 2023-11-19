import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { LoadComponent } from "./LoadComponent";
import Logo from '../assets/Logo.png';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';

const Sidebar = ({ onLoadSelect, onTruckSelect, loads, trucks }) => {
    const [selectedLoadId, setSelectedLoadId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleLoadClick = (Load) => {
        setSelectedLoadId(Load.loadId);
        onLoadSelect(Load);
    };

    const handleTruckClick = (truck_id) => {
        const selectedTruck = trucks.find(truck => truck.truckId.toString() === truck_id.id);
        onTruckSelect(selectedTruck); // Use the passed handler to set selected truck in App
        setSearchQuery("");
    };
    

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        console.log(searchQuery)
    };

    // Filter trucks based on the search query and limit to 3
    const filteredTrucks = trucks.filter(truck =>
        truck.truckId.toString().includes(searchQuery)
    ).slice(0, 3);

    const formattedTrucks = filteredTrucks.map(truck => ({
        id: truck.truckId.toString(), // Use the truckId as the id
        name: truck.truckId.toString(), // Use the truckId as the name
    }));

    return (
        <div className='items-center justify-center sidebar'>
            <img src={Logo} className='h-8 mt-4 ml-[110px] w-26' alt="logo" />
            <div className='flex items-center mx-2 mt-10 ml-12 bg-white'>
                <FontAwesomeIcon className='absolute ml-2 text-gray-400 ' icon={faSearch} />
                <div className='w-[250px] z-10'>
                <ReactSearchAutocomplete
                    items={formattedTrucks}
                    onSearch={handleSearchChange}
                    onSelect={handleTruckClick}
                    autoFocus
                    value={searchQuery}
                    onTruckSelect={handleTruckClick}
                    clearOnSelect = {true}
                    placeholder='Search for a truck...'
                />
                </div>
                <FontAwesomeIcon className='ml-2 text-gray-400 ' icon={faSliders} />
            </div>

            <div className="flex">
                <div className="mt-4 ml-12 font-medium">All Loads</div>
            </div>
            <div className="max-h-[650px] ml-10 pl-2 pt-2 overflow-y-auto">
                {loads.map(load => (
                    <LoadComponent
                        key={load.loadId}
                        Load={load}
                        onClick={() => handleLoadClick(load)}
                        isSelected={selectedLoadId === load.loadId}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
