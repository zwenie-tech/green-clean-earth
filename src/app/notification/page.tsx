import React from "react";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import Earth from "@/components/earth";

const Notification = () => {
  return (
    <>
      <NavigationBar />

      <div className="flex flex-col lg:flex-row w-full justify-center text-justify pl-6 pt-8">
        <div className="hidden lg:block lg:h-[270px] lg:w-[300px] relative">
          <img
            src="/images/joinnow1.jpeg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div
          className="w-full lg:w-1/2 lg:h-[270px] pl-6 flex flex-col justify-center"
          style={{ boxSizing: "border-box" }}
        >
          <h2 className="text-lg font-bold mb-2 text-primary">ഗ്രീൻ ക്ളീൻ കേരള</h2>
          <p className="mb-1 text-primary">സുസ്ഥിര വികസന ഹരിത മത്സരങ്ങളിൽ പങ്കെടുക്കുവാൻ</p>
          <p className="mb-1 text-primary">Www.GreenCleanEarth.org എന്ന വെബ്സൈറ്റിൽ രജിസ്റ്റർ ചെയ്യണം.</p>
          <p className="mb-1 text-primary">നിങ്ങൾക്ക് ഒരു റഫറൽ കോഡ് ലഭിക്കേണ്ടതുണ്ട്.</p>
          <p className="mb-1 text-primary">റഫറൽ കോഡ് ലഭിക്കുവാൻ:</p>
          <p className="mb-1 text-primary">നേരത്തെ രജിസ്ട്രേഷൻ ചെയ്തിട്ടുള്ള ആരെങ്കിലും താങ്കളെ ഇൻവൈറ്റ് ചെയ്യണം.</p>
          <p className="mb-1 text-primary">അല്ലെങ്കിൽ താഴെ കൊടുത്ത ഫോൺ നമ്പറിൽ ബന്ധപ്പെട്ട്</p>
          <p className="mb-1 text-primary">റഫറൽ കോഡ് സ്വീകരിക്കുക.</p>
          <p className="font-semibold mt-1 text-primary">
            കോൺടാക്ട്:
            <a href="tel:9645964592" className="ml-1 no-underline">
              9645 9645 92
            </a>
          </p>
        </div>
      </div>

      <Earth />
      <Footer />
    </>
  );
};

export default Notification;
