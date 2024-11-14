"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiURL, imageURL } from '@/app/requestsapi/request';

interface Ads {
  title: string;
  ad_link: string;
  ad_image: string;
  display_order: string;
  is_deleted: string;
}

export default function Footer() {
  const [currentImage, setCurrentImage] = useState(0);
  const [ads, setAds] = useState<Ads[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAdsDetails = async () => {
      const response = await fetch(`${apiURL}/common/getAds`);
      const data = await response.json();
      if (data.success) {
        
        setAds(data.count);
      }
    };

    fetchAdsDetails();
  }, []);

  useEffect(() => {
    if (ads.length > 0) { // Ensure ads array is populated before starting the interval
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % ads.length);
      }, 3000); // 3000 milliseconds = 3 seconds

      return () => clearInterval(interval);
    }
  }, [ads]); // Run this effect only when `ads` updates

  return (
    <footer className="w-full py-14 bg-transparent mt-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl px-6 mx-auto">
          <div className="flex justify-center items-center mt-1 mb-4">
            <h1 className="text-xl text-center font-bold">Our Supporters Sponsors & Co-Operators</h1>
          </div>
          <div className="w-full flex justify-center items-center mb-5">
            {ads.length > 0 && ads[currentImage]?.ad_image ? (
              <a
                href={`${ads[currentImage].ad_link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <img
                  src={`${imageURL}${ads[currentImage].ad_image}`}
                  alt="Sliding images"
                  className="shadow-xl w-full mx-6 rounded-2xl"
                  style={{ objectFit: 'cover' }}
                />
              </a>
            ) : ''}
          </div>

          <div className="relative mt-4 flex justify-center items-center" style={{ width: '100%', height: '400px' }}>
            <div className="absolute inset-0 rounded-xl" style={{
              backgroundImage: 'url(/images/navigation.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: '0.50'
            }}></div>
            <div className="relative bg-light-gray p-5 rounded-lg" style={{ maxWidth: '90%', textAlign: 'center', margin: '4rem auto' }}>
              <h1 className="text-black font-block mb-4">വൃക്ഷത്തൈ സെൽഫി മത്സരം 2024-25</h1>
              <p className="mb-4">വൃക്ഷങ്ങൾ സംരക്ഷിക്കൂ... ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ.. സമ്മാനങ്ങൾ നേടൂ...</p>
              <p className="mb-4">
                <a href="#">www.greencleanearth.org</a>
              </p>
              <div>
                <button
                  className="text-white bg-[#3C6E1F] px-4 py-2 rounded-xl"
                  onClick={() => { router.push('/Join'); }}
                  style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
          <div className="text-lg text-[#3C6E1F] text-center block mt-8">
            <p>Green Clean Earth Movement. All rights reserved</p>
            <p>A GCEM Foundation Compaing for Save Earth</p>
            <p>Supported By www.a2z4home.com. Online Green Architectural Directory</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
