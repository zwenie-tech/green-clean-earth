"use client"; // This directive ensures the component is treated as a client component
import React, { useState } from "react";
import IndiaMap from "./india";
import KeralanewMap from "./kerlanew";
import WorldMap from "./world";

const ResultImages = () => {
  const [selectedMap, setSelectedMap] = useState("kerala");

  const handleMapChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMap(event.target.value);
  };

  const renderMap = () => {
    switch (selectedMap) {
      case "india":
        return <IndiaMap />;
      case "kerala":
        return <KeralanewMap />;
      case "world":
        return <WorldMap />;
      default:
        return <KeralanewMap />;
    }
  };

  return (
    <>
      <div className="container mt-4 relative">
        <div className="mb-2 inline-block">
          <div className="flex flex-col gap-2">
            <label htmlFor="mapSelect" className="form-label">
              Select Map:
            </label>
            <select
              id="mapSelect"
              className="form-select border border-primary text-primary px-5 py-2 rounded-lg focus:border-primary active:border-primary focus:outline-primary active:outline-primary"
              value={selectedMap}
              onChange={handleMapChange}
            >
              <option value="kerala">Kerala</option>
              <option value="india">India</option>
              <option value="world">World</option>
            </select>
          </div>
        </div>
        {renderMap()}
      </div>
    </>
  );
};

export default ResultImages;
