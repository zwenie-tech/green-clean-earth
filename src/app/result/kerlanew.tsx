"use client";

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const keralaMapUrl = '/kerala.json'; // Ensure this path is correct and accessible

const KeralanewMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [districtData, setDistrictData] = useState<any[]>([]);
  const [overlayPosition, setOverlayPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false); // Track if it's mobile view

  useEffect(() => {
    // Fetch the district data from the API
    fetch('https://api-staging.greencleanearth.org/api/v1/common/districtList')
      .then(response => response.json())
      .then(data => setDistrictData(data.districtList))
      .catch(error => console.error("Error fetching district data:", error));

    // Determine if the device is mobile
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (geo: any, event: React.MouseEvent | React.TouchEvent) => {
    const districtName = geo.properties.DISTRICT;
    const districtInfo = districtData.find(d => d.dis_name === districtName);

    if (districtInfo) {
      setSelectedDistrict(`${districtName} - Upload Count: ${districtInfo.upload_count}`);

      if (!isMobile) {
        // Get the position from mouse or touch event only for non-mobile
        const isTouch = 'touches' in event;
        const x = isTouch ? event.touches[0].clientX : event.clientX;
        const y = isTouch ? event.touches[0].clientY : event.clientY;

        setOverlayPosition({ x, y });
      }
    }
  };

  const handleMouseLeave = () => {
    setSelectedDistrict(''); // Clear the selected district when mouse leaves
  };

  const getDistrictFillColor = (districtName: string) => {
    const districtInfo = districtData.find(d => d.dis_name === districtName);
    return districtInfo && districtInfo.upload_count > 0 ? '#3C6E1F' : '#D0E0F0';
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
          width={500}
          height={370} // Adjust height to fit the content
          style={{ maxWidth: '100%', height: 'auto' }}
          className="map"
        >
          <Geographies geography={keralaMapUrl}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography
                  key={i}
                  geography={geo}
                  fill={getDistrictFillColor(geo.properties.DISTRICT)} // Set the fill color dynamically
                  stroke="#000"
                  strokeWidth={0.5}
                  onMouseEnter={(event) => handleMouseEnter(geo, event)} // Handle hover on desktop
                  onMouseLeave={handleMouseLeave} // Hide overlay when the mouse leaves
                  onClick={(event) => handleMouseEnter(geo, event)} // Handle click on mobile
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
        <div className={`overlay ${isMobile ? 'mobile-overlay' : ''}`} style={{ top: overlayPosition.y, left: overlayPosition.x }}>
          <h3>{selectedDistrict}</h3>
        </div>
      )}

      <style jsx>{`
        .overlay {
          z-index: 10;
          max-width: 300px;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 10px;
          position: fixed;
          transform: translate(-50%, -100%); /* Position above the mouse/touch point for desktop */
        }

        .mobile-overlay {
          position: static; /* Position below the map for mobile */
          transform: none;
          margin-top: 20px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .map {
            width: 100% !important;
            height: 400px !important;
          }

          .overlay {
            position: static;
            margin: 0 auto;
            transform: none;
            width: 80%;
            max-width: 300px;
          }
        }

        @media (min-width: 769px) {
          .map {
            width: 800px !important;
            height: 600px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default KeralanewMap;
