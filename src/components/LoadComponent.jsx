import React, { useState } from 'react';
import {
    setDefaults,
    geocode,
    RequestType,
} from "react-geocode";
import BoxImg from '../assets/box_parcel.jpg';
import GreenDot from '../assets/location.svg';
import DestinationDot from '../assets/Destination_dot.png';


setDefaults({
    key: "AIzaSyD9tAFBsLY-TJV21XT2O9UtxxSOTYFqYSw", // Replace with your actual API key.
    language: "en",
    region: "es",
});

export const LoadComponent = ({ Load, onClick, isSelected }) => {
    const [originStreet, setOriginStreet] = useState('Loading...');
    const [originCity, setOriginCity] = useState('');
    const [destinationStreet, setDestinationStreet] = useState('Loading...');
    const [destinationCity, setDestinationCity] = useState('');

    const formatAddress = (address) => {
        const parts = address.split(',');
        return parts.length > 1 ? [parts.slice(0, -2).join(','), parts.slice(-2).join(',')] : [address, ''];
    };

    const getAdress = () => {
        geocode(RequestType.LATLNG, [Load.originLatitude, Load.originLongitude].join(','))
        .then(({ results }) => {
            const [street, city] = formatAddress(results[0].formatted_address);
            setOriginStreet(street);
            setOriginCity(city);
        })
        .catch(error => {
            console.error(error);
            setOriginStreet('Failed to load address');
            setOriginCity('');
        });

        geocode(RequestType.LATLNG, [Load.destinationLatitude, Load.destinationLongitude].join(','))
        .then(({ results }) => {
            const [street, city] = formatAddress(results[0].formatted_address);
            setDestinationStreet(street);
            setDestinationCity(city);
        })
        .catch(error => {
            console.error(error);
            setDestinationStreet('Failed to load address');
            setDestinationCity('');
        });
    };

    // Call getAdress on component mount
    React.useEffect(() => {
        getAdress();
    }, []);

    return (
        <div className={`load-component flex-1 w-[250px] h-[250px] p-6 mb-10 bg-white drop-shadow-lg rounded-xl ${isSelected ? 'border-2 border-green-500 shadow-lg shadow-02B528' : ''}`}
        onClick={onClick}>
            <div className='flex items-center justify-between'>
                <div> 
                    <div className='text-[14px] text-gray-400'>Load ID</div>
                    <div className='text-[14px] font-medium'>LOAD-{Load.loadId}</div>
                </div>
                <div>
                    <img src={BoxImg} className='w-16 h-16' alt="box" />
                </div>
            </div>
            <div className='text-[12px] text-gray-400 mb-2'>ORIGIN</div>
            <div className='flex'>
                <div className='flex items-center'>
                    <img src={GreenDot} className='w-6 h-6 mr-4 ' alt="green-dot" />
                </div>
                <div className='text-[12px]'>
                    <div>{originStreet}</div>
                    <div className='text-[12px] text-gray-500 mb-2'>{originCity}</div>
                </div>
            </div>
            
            <div className='text-[12px] text-gray-400 mb-2'>DESTINATION</div>
            <div className='flex'>
                <div className='flex items-center'>
                    <img src={DestinationDot} className='w-6 h-6 mr-4' alt="green-dot" />
                </div>
                <div className='text-[12px]'>
                    <div>{destinationStreet}</div>
                    <div className='text-[12px] text-gray-500 mb-2'>{destinationCity}</div>
                </div>
            </div>

        </div>
    );
}
