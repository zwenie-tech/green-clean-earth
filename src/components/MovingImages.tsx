import { useEffect, useState } from 'react';

const MovingImages = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full" style={{ marginLeft: '20px', marginRight: '20px' }}>
      <img
        src="/images/oil.jpg"
        alt="Image 1"
        className={`absolute top-0 left-0 transition-opacity duration-1000 ${
          currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: '100px', width: 'calc(100% - 40px)' ,marginBottom:'15px'}} // Adjust width for margins
      />
      <img
        src="/images/build.jpg"
        alt="Image 2"
        className={`absolute top-0 left-0 transition-opacity duration-1000 ${
          currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: '100px', width: 'calc(100% - 40px)',marginBottom:'15px' }} // Adjust width for margins
      />
    </div>
  );
};

export default MovingImages;
