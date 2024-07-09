import Footer from "@/components/footer";
import NavigationBar from "@/components/navigationBar";
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Flag for client-side rendering

  useEffect(() => {
    setIsMounted(true); // Set flag to true when component mounts on client
  }, []);

  const images = [
    '/images/image1.jpeg',
    '/images/image2.jpeg',
    '/images/image3.jpeg',
  ];

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

const reactPlayerContent = isMounted ? (
    <div className="flex justify-center items-center p-0" style={{ height: '100%' }}>
      <ReactPlayer url="https://youtu.be/7VY3L7m6iyM" width="100%" height="100%" />
    </div>
  ) : null;


  return (
    <div className="body">
      <NavigationBar />
      <div className="relative w-full h-[50vh] overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Sliding Image"
          className="w-full h-full object-cover"
        />
        <button
          onClick={handlePrev}
          className="absolute inset-y-0 left-4 flex items-center justify-center p-2 rounded-full shadow-lg focus:outline-none"
        >
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute inset-y-0 right-4 flex items-center justify-center p-2 rounded-full shadow-lg focus:outline-none"
        >
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="container mx-auto p-0">
        <div className="grid gap-0 md:grid-cols-3 sm:grid-cols-1">
          
          {/* Box 1 */}
          <div className="bg-dark-green text-white flex flex-col justify-center items-center px-4 py-8">
            <h2 className="text-light-green text-2xl p-2">ഗ്രീൻ ക്ലീൻ കേരള-വൃക്ഷത്തൈ പരിപാലന മത്സരം -</h2>
            <p className="mt-4 px-2">
              പരിസ്ഥിതി ദിനത്തിലും തുടർന്നും നടുന്ന വൃക്ഷത്തൈകൾ വേനൽക്കാലത്ത്‌ സംരക്ഷിക്കുന്നതിനെ പ്രോത്സാഹിപ്പിക്കാൻ, അതിന്റെ കൂടെ ഓരോ മൂന്ന് മാസം കൂടുമ്പോഴും ഒരു സെൽഫി എടുത്ത് ഈ വെബ് സൈറ്റിൽ അപ്ലോഡ് ചെയ്താൽ ഭാഗ്യശാലികൾക് സമ്മാനങ്ങൾ നൽകുന്നു. കൂടാതെ…
            </p>
            <Link href="/project" legacyBehavior>
              <a className="text-light-green mt-2 self-start px-2" style={{ textDecoration: 'none' }}>Read more</a>
            </Link>
          </div>
          
          {/* Box 2 */}
          
          {reactPlayerContent}
        {/* Box 3 */}
           <div className="relative flex justify-center items-center bg-cover bg-center text-white p-4" style={{ backgroundImage: 'url(/images/image1.jpeg)' }}>
            <div className="bg-opacity-50 bg-none p-4">
              <h2 className="text-light-green text-2xl">ഹരിത കേരളം -സുന്ദര കേരളം -ഹരിത ശുചിത്വ മത്സരങ്ങൾ</h2>
              <p className="mt-4">
                ഹരിത കേരളം പദ്ധതിയുടെ വിജയത്തിനായി വിവിധ സ്ഥാപനങ്ങളുടെ കൂട്ടായ്മയായ Green Clean Kerala Mission സംഘടിപ്പിക്കുന്ന മത്സരാധിഷ്ഠിതമായ ഒരു പദ്ധതിയാണ് ഗ്രീൻ ക്ലീൻ കേരള -ഹരിത ശുചിത്വ മത്സരങ്ങൾ
              </p>
              <Link href="/project" legacyBehavior>
                <a className="text-light-green mt-2 self-start px-2" style={{ textDecoration: 'none' }}>Read more</a>
              </Link>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
