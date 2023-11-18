import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons"
import { LoadComponent } from "./LoadComponent"
import { useState } from "react"
import Logo from '../assets/Logo.png'
import Turnstone from 'turnstone'


const Sidebar = ({ onLoadSelect, loads }) => {
    const [selectedLoadId, setSelectedLoadId] = useState(null);
  
    const handleLoadClick = (Load) => {
      setSelectedLoadId(Load.loadId);
      onLoadSelect(Load);
    };  

    return (
        <div className='items-center justify-center sidebar'>
            <img src={Logo} className='h-8 mt-4 ml-[110px] w-26' alt="logo" />
            <div className='flex items-center mx-2 mt-10 ml-12 bg-white'>
                <FontAwesomeIcon className='absolute ml-2 text-gray-400 ' icon={faSearch} />
                <input className='px-8 py-2 pl-8 rounded-xl' placeholder='Search...' />
                <FontAwesomeIcon className='ml-2 text-gray-400 ' icon={faSliders} />
            </div>
            <div className="flex">
                <div className="mt-10 ml-12 font-bold">Available Loads</div>
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
    )
}

export default Sidebar