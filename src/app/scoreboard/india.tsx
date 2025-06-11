"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Container } from "react-bootstrap";
import { apiURL } from '../requestsapi/request';

interface StateData {
  st_id: number;
  st_name: string;
  hc_a2_code: string;
  upload_count: number;
}

function IndiaMap() {
  const [stateName, setStateName] = useState<string>(""); 
  const [showInfo, setShowInfo] = useState<boolean>(false); 
  const [indiaTopoJson, setIndiaTopoJson] = useState<any>(null); 
  const [stateData, setStateData] = useState<StateData[]>([]); 
  const [uploadCount, setUploadCount] = useState<number | null>(null);
  const [totalUploads, setTotalUploads] = useState<number | null>(null); // State to hold total uploads count for India
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch the India map JSON data
    fetch('/india.json')
      .then(response => response.json())
      .then(data => setIndiaTopoJson(data))
      .catch(error => console.error("Error loading map data:", error));

    // Fetch state data with upload counts
    fetch(`${apiURL}/common/stateMapData`)
      .then(response => response.json())
      .then(data => setStateData(data.stateMapData))
      .catch(error => console.error("Error loading state data:", error));

    // Fetch total upload count for India
    fetch(`${apiURL}/common/totalUploadIndiaCount`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setTotalUploads(data.count); // Extract the count value
        } else {
          console.error("Failed to fetch total uploads for India: ", data);
        }
      })
      .catch(error => console.error("Error fetching total uploads for India:", error));
  }, []);

  const handleStateHover = (geo: any, event: React.MouseEvent) => {
    const hoveredStateCode = geo.properties['hc-a2'];
    const hoveredState = stateData.find(state => state.hc_a2_code === hoveredStateCode);

    if (hoveredState) {
      setStateName(hoveredState.st_name);
      setUploadCount(hoveredState.upload_count);
      setMousePosition({ x: event.clientX, y: event.clientY });
      setShowInfo(true);
    }
  };

  const handleStateHoverLeave = () => {
    setShowInfo(false);
  };

  const getStateFillColor = (hc_a2_code: string) => {
    const state = stateData.find(state => state.hc_a2_code === hc_a2_code);
    return state && state.upload_count > 0 ? "#3C6E1F" : "#D6D6DA";
  };

  if (!indiaTopoJson) return <div>Loading map...</div>;

  return (
    <Container className="p-3">
      <div className="md:inline-block md:absolute md:top-0 md:right-0">
        <h1 className='mb-1 text-primary text-2xl font-bold'>India Details</h1>
        <h1 className='mb-1 text-primary text-2xl font-bold'>Total Uploads: {totalUploads !== null ? totalUploads : 'Loading...'}</h1>
      </div>
      <div className="map-container">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 935, 
            center: [81, 21]
          }}
          style={{ height: "auto", width: "100%" }} 
        >
          <Geographies geography={indiaTopoJson}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(event) => handleStateHover(geo, event)} 
                  onMouseLeave={handleStateHoverLeave} 
                  style={{
                    default: {
                      fill: getStateFillColor(geo.properties['hc-a2']), // Dynamic fill color
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      stroke: "#FF5722",
                      strokeWidth: 1,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      stroke: "#FF5722",
                      strokeWidth: 1,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>

        {showInfo && (
          <div
            className="overlay"
            style={{ left: mousePosition.x + 10, top: mousePosition.y - 60 }} // Adjust position relative to mouse pointer
          >
            <h3>{stateName}</h3>
            <p>Upload Count: {uploadCount}</p> 
          </div>
        )}
      </div>

      <style jsx>{`
        .map-container {
          position: relative;
          width: 100%;
          height: auto;
        }

        .overlay {
          position: absolute;
          z-index: 10;
          max-width: 400px;
          width: 80%;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transform: translate(-50%, 0);
        }

        @media (max-width: 768px) {
          .overlay {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (min-width: 769px) {
          .overlay {
            width: 80%;
            max-width: 400px;
          }
        }
      `}</style>
    </Container>
  );
}

export default IndiaMap;
