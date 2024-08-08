"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Container, Button } from "react-bootstrap";

function IndiaMap() {
  const [stateName, setStateName] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [indiaTopoJson, setIndiaTopoJson] = useState(null);

  useEffect(() => {
    fetch('/india.json') // Ensure the JSON file is in the public directory
      .then(response => response.json())
      .then(data => setIndiaTopoJson(data))
      .catch(error => console.error("Error loading map data:", error));
  }, []);

  const handleStateClick = (name) => {
    setStateName(name);
    setShowInfo(true);
  };

  const handleOverlayClose = () => {
    setShowInfo(false);
  };

  if (!indiaTopoJson) return <div>Loading map...</div>;

  return (
    <Container className="p-3">
      <div className="map-container">
        <h1 className='mb-1 text-primary text-center text-2xl font-bold'>India Details</h1>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 800, // Adjust the scale for better fit
            center: [80, 20] // Center on India
          }}
          style={{ height: "auto", width: "100%" }} // Ensure the map fits within the container
        >
          <Geographies geography={indiaTopoJson}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleStateClick(geo.properties.name)}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      stroke: "#607D8B", // Add border color
                      strokeWidth: 0.75, // Adjust the stroke width as needed
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      stroke: "#FF5722", // Change border color on hover
                      strokeWidth: 1, // Increase the stroke width on hover
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      stroke: "#FF5722", // Change border color on pressed
                      strokeWidth: 1, // Increase the stroke width on pressed
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>

        {showInfo && (
          <div className="overlay">
            <h3>{stateName}</h3>
            <p>Here is some information about {stateName}. Detailed description and additional information can be provided here.</p>
            <Button onClick={handleOverlayClose} variant="secondary">
              Close
            </Button>
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
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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
          .overlay {
            position: static;
            transform: none;
            margin-top: 20px;
            margin:auto;
            width:100%;
          }
        }

        @media (min-width: 769px) {
          .overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </Container>
  );
}

export default IndiaMap;
