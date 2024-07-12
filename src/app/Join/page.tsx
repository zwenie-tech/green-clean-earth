import React from 'react';
import Navigation from "../../components/navigationBar";
import Footer from "../../components/footer";
import Image from 'next/image';
import Earth from '@/components/earth';

const JoinNow = () => {
    return (
        <div>
            <Navigation />
            <div className="flex justify-center items-center" style={{ marginTop: '40px', height: '60px' }}>
                <h1 className="text-4xl font-bold" style={{ textAlign: 'center' }}>ഹരിത കേരളം വൃക്ഷത്തൈ പരിപാലന മത്സരം.</h1>
            </div>
            <div className="flex justify-center items-center" style={{ marginTop: '20px' }}>
                <h3 className="text-2xl font-bold" style={{ textAlign: 'center', color: '#3C6E1F' }}>
                    വൃക്ഷങ്ങൾ നട്ട് വളർത്തൂ..ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ..<br />
                    സമ്മാനങ്ങൾ നേടൂ....ഭൂമിയെ രക്ഷിക്കൂ....
                </h3>
            </div>
            {/*image */}
            <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 md:grid-cols-10 h-full">
        <div className="md:col-span-3 flex border-7 h-full">
            <div className="relative w-full h-full" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <Image
                    src="/images/joinnow1.jpeg"
                    alt="Description of image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
        </div>
        <div className="md:col-span-7 bg-gray-100 p-6 flex flex-col justify-between" style={{ borderRadius: '8px', height: '100%' }}>
            <div className="flex justify-center items-center mb-4">
                <button className="bg-gray-200 text-green-700 shadow-lg rounded-md px-4 py-1" style={{ marginRight: '5px' }}>
                    Login
                </button>
                <p style={{ color: '#3C6E1F', margin: '0 5px' }}>|</p>
                <button className="bg-gray-200 text-green-700 shadow-lg rounded-md px-4 py-1" style={{ marginLeft: '5px' }}>
                    Registration
                </button>
            </div>
            <div className="text-container mb-4" style={{ margin: '0' }}>
                <h3 className="font-bold mb-2">
                    വൃക്ഷത്തൈകളുടെ ഫോട്ടോ അപ്ലോഡ് ചെയ്യാൻ 3 ലളിത ഘട്ടങ്ങൾ
                </h3>
                <p>(1) ഒരു വൃക്ഷത്തൈ നട്ട് അതിൻ്റെ ഫോട്ടോ എടുക്കുക.</p>
                <p>(2) മുകളിൽ കാണുന്ന Register എന്ന ബട്ടൺ ക്ലിക്ക് ചെയ്ത് താങ്കളുടെ പേര് രജിസ്റ്റർ ചെയ്യുക.</p>
                <p>(3) Login ചെയ്ത് ൽ Dash Board ൽ എത്തിയാൽ Upload Plants എന്ന ബട്ടൺ Click ചെയ്ത്.</p>
                <p>നിർദ്ദേശങ്ങൾ പ്രകാരം ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.</p>
            </div>
            <div className="text-container" style={{ margin: '0' }}>
                <h3 className="font-bold mb-2">
                    വൃക്ഷത്തൈകളുടെ ഫോട്ടോ അപ്ലോഡ് ചെയ്യാൻ 3 ലളിത ഘട്ടങ്ങൾ
                </h3>
                <p>(1) ഒരു വൃക്ഷത്തൈ നട്ട് അതിൻ്റെ ഫോട്ടോ എടുക്കുക.</p>
                <p>(2) മുകളിൽ കാണുന്ന Register എന്ന ബട്ടൺ ക്ലിക്ക് ചെയ്ത് താങ്കളുടെ പേര് രജിസ്റ്റർ ചെയ്യുക.</p>
                <p>(3) Login ചെയ്ത് ൽ Dash Board ൽ എത്തിയാൽ Upload Plants എന്ന ബട്ടൺ Click ചെയ്ത്.</p>
                <p>നിർദ്ദേശങ്ങൾ പ്രകാരം ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.</p>
            </div>
        </div>
    </div>
</div>
<Earth/>
            <Footer />
        </div>
    );
};

export default JoinNow;
