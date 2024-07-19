import React from 'react';
import Link from 'next/link';

const Earth = () => {
    return (
        <div className="container mt-3 mx-auto shadow-xl p-6">
            <div className="grid gap-4">
                {/* First div */}
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-[70%] md:pr-6 ml-8 mb-4 md:mb-0">
                        <h2 className="font-bold mb-2 text-3xl" style={{ color: '#3C6E1F' }}>Green Clean Earth Movement</h2>
                        <p>
                            ഭൂമിയെ ഹരിതാഭമാക്കാനും, മാലിന്യ മുക്തമാക്കാനും ജനങ്ങളെ പ്രേരിപ്പിക്കാൻവിവിധ സ്ഥാപങ്ങളുടെയും, സംഘടനകളുടെയും , സഹകരണത്തോടെ GCEM Foundation ആവിഷ്‌കരിച്ച് നടപ്പിൽ വരുത്തുന്ന ഒരു ബഹുജനമുന്നേറ്റമാണ് Green Clean Earth Movement(GCEM).
                        </p>
                        <h2 className="font-bold mb-2 text-3xl mt-10" style={{ color: '#3C6E1F' }}>GCEM Foundation</h2>
                        <Link href="/" legacyBehavior>
                            <a className="font-bold mb-2" target="_blank" rel="noopener noreferrer">www.GreenCleanEarth.Org</a>
                        </Link>
                        <p>
                            ഭൂമിയെ ഹരിതാഭമാക്കാനും, മാലിന്യ മുക്തമാക്കാനും ജനങ്ങളെ പ്രേരിപ്പിക്കാൻവിവിധ സ്ഥാപങ്ങളുടെയും, സംഘടനകളുടെയും , സഹകരണത്തോടെ GCEM Foundation ആവിഷ്‌കരിച്ച് നടപ്പിൽ വരുത്തുന്ന ഒരു ബഹുജനമുന്നേറ്റമാണ് Green Clean Earth Movement(GCEM).
                        </p>
                        
                    </div>
                    <div className="md:w-[30%] md:pl-6">
                        <img
                            src="/images/planting_trees.jpg"
                            alt="Description of image"
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>
                {/* Second div */}
                <div className="flex flex-col md:flex-row mt-4">
                    <div className="md:w-[30%] md:pr-6">
                        <img
                            src="/images/planting_trees_2.jpg"
                            alt="Description of image"
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                    <div className="md:w-[70%] md:pl-6" style={{textAlign:'right'}}>
                    <h2 className="font-bold mb-2 text-3xl" style={{ color: '#3C6E1F' }}>നിങ്ങൾക്കും പങ്കെടുക്കാം</h2>
                        <p>
                            
ഗ്രീൻ ക്ളീൻ എർത്ത് മൂവ്മെന്റ് പ്രവർത്തനങ്ങളിലേക്ക് താങ്കളെ സ്വാഗതം ചെയ്യുന്നു. മെമ്പർഷിപ്പ്. ഒരു വൃക്ഷത്തൈ നട്ട് ഹരിതപുരസ്കാരം സമ്മാന പദ്ധതിയിൽ അപ്‌ലോഡ് ചെയ്യാൻ തയ്യാറുള്ളവരും പരിസ്ഥിതി പ്രവർത്തനങ്ങളിൽ സേവനം ചെയ്യാൻ താല്പര്യവുമുള്ളവരുമായ ആർക്കും മെമ്പർഷിപ്പിന് അപേക്ഷിക്കാവുന്നതാണ്.അപേക്ഷയൊപ്പം താങ്കൾ ഇതുവരെ ചെയ്തതും ചെയ്യാൻ ഉദ്ദേശിക്കുന്നതുമായ സാമൂഹ്യപ്രവർത്തനങ്ങളെ കുറിച്ച് ഒരു ലഘു വിവരണവും നല്കേണ്ടതാണ്. കമ്മിറ്റിയുടെ അംഗീകാരം ലഭിച്ചാൽ താങ്കൾക്ക് മെമ്പർഷിപ്പ് ലഭിക്കുന്നതാണ്. അപേക്ഷകൾ സമർപ്പിക്കേണ്ടത്. Mail id- gcemfoundation@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Earth;
