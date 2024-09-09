// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// const mapUrl = '/kerala.json'; // Ensure this path is correct and accessible

// const KeralaMap = () => {
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [uploadcount,setuploadcount]=useState('')
//   const [mapData, setMapData] = useState(null);

//   useEffect(() => {
//     fetch(mapUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMapData(data);
//       })
//       .catch((error) => {
//         console.error("Error loading map data:", error);
//       });
//   }, []);

//   const handleClick = (name,count) => {
//     setSelectedDistrict(name);
//     setuploadcount(count);
//   };

//   const handleOverlayClose = () => {
//     setSelectedDistrict(''); // Clear the selected district
//   };

//   if (!mapData) {
//     return <div>Loading map...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '10px', height: '100vh', overflow: 'hidden' }}>
//       <h1 className='mb-1 text-primary text-2xl text-bold'>Kerala Details</h1>
//       <div className="map-container">
//         <ComposableMap
//           projectionConfig={{
//             scale: 6000,  // Adjust scale to fit the map
//             center: [76.5, 10.5], // Approximate center of Kerala, adjust as needed
//           }}
//           style={{ width: '100%', height: '100%' }} // Make the map cover the full container
//         >
//           <Geographies geography={mapData}>
//             {({ geographies }) =>
//               geographies.map((geo, i) => (
//                 <Geography
//                   key={i}
//                   geography={geo}
//                   fill="#D0E0F0"
//                   stroke="#000"
//                   strokeWidth={0.5}
//                   onClick={() => handleClick(geo.properties.DISTRICT,geo.properties.uploadCount)}
//                   style={{
//                     default: {
//                       outline: 'none',
//                     },
//                     hover: {
//                       fill: '#F53',
//                       transition: 'all 0.3s ease',
//                       outline: 'none',
//                     },
//                     pressed: {
//                       outline: 'none',
//                     },
//                   }}
//                 />
//               ))
//             }
//           </Geographies>
//         </ComposableMap>
//       </div>
      
//       {selectedDistrict && (
//         <div className="overlay position-fixed top-50 start-50 translate-middle bg-light p-4 rounded shadow">
//           <h3>{selectedDistrict}</h3>
//           <p>total uploads: {uploadcount}.</p>
//           <button className="btn btn-secondary" onClick={handleOverlayClose}>
//             Close
//           </button>
//         </div>
//       )}

//       <style jsx>{`
//         .map-container {
//           position: relative;
//           width: 100%;
//           height: 80vh; /* Adjust height to cover the desired area */
//           margin: 0 auto;
//         }
//         @media (max-width: 768px) {
//           .map-container {
//             height:auto;
//             position:relative;
//             width:100%;
//           }

//         .overlay {
//           z-index: 10;
//           max-width: 400px;
//           width: 80%;
//           text-align: center;
//           background-color: #f8f9fa;
//           border-radius: 8px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//           padding: 20px;
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default KeralaMap;
