import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const worldMapUrl = '/worldmads.json'; // Ensure this path is correct and accessible

interface CountryData {
  cntry_id: number;
  cntry_name: string;
  iso_a3: string;
  upload_count: number;
}

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [countryColors, setCountryColors] = useState<{ [key: string]: string }>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [totalUploads, setTotalUploads] = useState<number | null>(null); // State to hold total uploads count for the world

  useEffect(() => {
    // Fetch country data from the API
    fetch('https://api-staging.greencleanearth.org/api/v1/common/countryMapData')
      .then(response => response.json())
      .then(data => {
        setCountryData(data.countryData);

        // Generate colors based on upload_count
        const colors = data.countryData.reduce((acc: { [key: string]: string }, country: CountryData) => {
          acc[country.iso_a3] = country.upload_count > 0 ? '#3C6E1F' : '#D0E0F0'; // Green if upload_count > 0, else default color
          return acc;
        }, {});

        setCountryColors(colors);
      })
      .catch(error => console.error('Error fetching country data:', error));

    // Fetch total upload count for the world
    fetch('https://api-staging.greencleanearth.org/api/v1/common/totalUploadCount')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setTotalUploads(data.count); // Extract the count value
        } else {
          console.error("Failed to fetch total uploads for the world: ", data);
        }
      })
      .catch(error => console.error("Error fetching total uploads for the world:", error));

    // Set isMobile based on screen size
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (iso_a3: string, event: React.MouseEvent | React.TouchEvent) => {
    const country = countryData.find(country => country.iso_a3 === iso_a3);
    if (country) {
      setSelectedCountry(country);

      if (!isMobile) {
        // Capture mouse coordinates only for non-mobile
        const isTouch = 'touches' in event;
        const x = isTouch ? event.touches[0].clientX : event.clientX;
        const y = isTouch ? event.touches[0].clientY : event.clientY;
        setMousePosition({ x, y });
      }
    }
  };

  const handleMouseLeave = () => {
    setSelectedCountry(null); // Clear the selected country when the mouse leaves
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px', position: 'relative' }}>
      <h1 className='mb-1 text-primary text-2xl font-bold'>World Details</h1>
      <h2 className='mb-1 text-primary text-xl font-bold'>
        Total Uploads: {totalUploads !== null ? totalUploads : 'Loading...'}
      </h2>
      <div className='mt-0'>
        <ComposableMap
          projectionConfig={{
            scale: 125,
            center: [0, 30],
          }}
          width={800}
          height={360}
          style={{ maxWidth: '100%', height: 'auto' }}
          className="map"
        >
          <Geographies geography={worldMapUrl}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography
                  key={i}
                  geography={geo}
                  fill={countryColors[geo.properties.iso_a3] || "#D0E0F0"} // Use color from state
                  stroke="#000"
                  strokeWidth={0.5}
                  onMouseEnter={(event) => {
                    handleMouseEnter(geo.properties.iso_a3 || geo.properties.adm0_a3 || geo.properties.su_a3 || geo.properties.brk_a3, event);
                  }}
                  onMouseLeave={handleMouseLeave}
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
      
      {selectedCountry && (
        <div
          className={`overlay ${isMobile ? 'mobile-overlay' : ''}`}
          style={{
            left: isMobile ? '50%' : mousePosition.x + 10,
            top: isMobile ? '50%' : mousePosition.y + 10,
            transform: isMobile ? 'translate(-50%, -50%)' : 'none',
            position: isMobile ? 'fixed' : 'absolute'
          }}
        >
          <h3>{selectedCountry.cntry_name}</h3>
          <p>Upload Count: {selectedCountry.upload_count}</p>
        </div>
      )}

      <style jsx>{`
        .overlay {
          z-index: 10;
          max-width: 200px;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 10px;
          pointer-events: none; /* Prevent the overlay from blocking mouse interactions */
        }

        .mobile-overlay {
          width: 90%; /* Take up 90% of the screen width on mobile */
          max-width: 300px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        @media (max-width: 768px) {
          .map {
            width:100% !important;
            height: 500px !important; /* Increased height for mobile view */
          }

          .mobile-overlay {
            position: fixed;
            max-width: 300px;
            background-color: #f8f9fa;
          }
        }

        @media (min-width: 769px) {
          .map {
            width: 800px !important;
            height: 360px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WorldMap;
