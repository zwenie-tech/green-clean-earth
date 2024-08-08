"use client"; // Indicate this is a Client Component

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const keralaMapUrl = '/kerala.json'; // Ensure this path is correct and accessible

const KeralanewMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleClick = (name) => {
    setSelectedDistrict(name);
  };

  const handleOverlayClose = () => {
    setSelectedDistrict(''); // Clear the selected district
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <h1 className='text-primary text-2xl font-bold mb-0'>Kerala Details</h1> 
      <div className='mt-0 mb-0'>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4000,
            center: [76.2711, 10.8505], // Center coordinates for Kerala
          }}
          width={800}
          height={600} // Increased height to cover more area
          style={{ maxWidth: '100%', height: 'auto' }}
          className="map"
        >
          <Geographies geography={keralaMapUrl}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography
                  key={i}
                  geography={geo}
                  fill="#D0E0F0"
                  stroke="#000"
                  strokeWidth={0.5}
                  onClick={() => handleClick(geo.properties.DISTRICT)}
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: '#F53',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      {selectedDistrict && (
        <div className="overlay">
          <h3>{selectedDistrict}</h3>
          <p>Here is some information about {selectedDistrict}.</p>
          <button className="btn btn-secondary" onClick={handleOverlayClose}>
            Close
          </button>
        </div>
      )}

      <style jsx>{`
        .overlay {
          z-index: 10;
          max-width: 400px;
          width: 80%;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }

        @media (max-width: 768px) {
          .map {
            width: 100% !important;
            height: 400px !important;
          }
          .overlay {
            position: static;
            margin-top: 20px;
            transform: none;
            margin-left: 0;
            margin-right: 0;
            width: 100% !important;
          }
        }

        @media (min-width: 769px) {
          .map {
            width: 800px !important;
            height: 600px !important;
          }
          .overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
};

export default KeralanewMap;
