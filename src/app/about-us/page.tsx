import React from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
import Earth from '@/components/earth'

const AboutUs = () => {
    // const directors__ = [
    //     { title: "Director & Chief Patron", name: "Prof. Shobheendran Master", location: "Kakkody" },
    //     { title: "Executive Director - 9645 119 474", name: "Muhammad Iqubal.K", location: "Koduvally" },
    //     { title: "Director & Chairman", name: "Dr. Yahyakhan", location: "Kozhikode" },
    //     { title: "Director & Finance coordinator", name: "Muhammad Ismail master.P.P", location: "Narikkuni" },
    //     { title: "Director & Finance coordinator", name: "Ismail", location: "Kottakkal" },
    //     { title: "Director & Marketing coordinator", name: "Anvar Sadik", location: "Palazhi" },
    //     { title: "Director & Event coordinator", name: "Ashraf.K", location: "Koduvally" },
    //     { title: "Director & Event coordinator", name: "Satheeshan Koroth", location: "Nanmanada" },
    //     { title: "Director & Event coordinator", name: "Naser.Pattani", location: "Koduvally" },
    //     { title: "Director & Event coordinator", name: "V.P Asraf", location: "Koduvally" },
    //     { title: "Director & Publicity-Coordinator", name: "Shafeek.K.C", location: "Koduvally" },
    //     { title: "Director & Publicity-Coordinator", name: "Ansar.N.K", location: "Kozhikode" },
    //     { title: "Director", name: "Prashob.O", location: "Kozhikode" },
    //     { title: "Director", name: "Faizal.K", location: "Kattangal" },
    //     { title: "Director", name: "Shafeek", location: "Malappuram" },
    //     { title: "Director", name: "Farooq R.K", location: "Koduvally" },
    //     { title: "Director", name: "Smmas.P K", location: "Narikkini" },
    //     { title: "Director", name: "Muhammad Mirzah.K", location: "Koduvally" }
    // ];
    const directors = [
        { title: "Chairman, Director & Founder", name: "Muhammad Iqubal K", location: "Pannur" },
        { title: "Executive Director", name: "Ismail", location: "Kottakkal" },
        { title: "Director & Vice Chairman", name: "Muhammad Ismail P P", location: "Narikkuni" },
        { title: "Director & Vice Chairman", name: "Muhammad Shafeeq K C", location: "Pannur" },
        { title: "Director & Treasurer ", name: "Satheeshan Koroth", location: "Namnmanda" },
        { title: "Director & Marketing coordinator", name: "Anvar Sadik", location: "Palazhi" },
        { title: "Director & Environmental Coordinator", name: "Muhammad Ashraf VP", location: "Koduvally" },
        { title: "Director", name: "Dr. Yahyakhan", location: "Kozhikode" },
        { title: "Director", name: "Muhammad Ansar N K", location: "Kozhikode" },
        { title: "Director", name: "Muhammad Ashraf K", location: "Pannur" },
        { title: "Director", name: "Naser Pattanil", location: "Koduvally" },
        { title: "Director", name: "Prashob O", location: "Kozhikode" },
        { title: "Director", name: "Faizal K", location: "Mavoor" },
        { title: "Director", name: "Shafeek M", location: "Malappuram" },
        { title: "Director", name: "Farooq R K", location: "Pannur" },
        { title: "Director", name: "Muhammad Shammas P", location: "Narikkini" },
        { title: "Director", name: "Muhammad Mirzah K", location: "Pannur" }
    ];

    return (
        <>
            <NavigationBar />
            <div className="flex justify-center items-center mt-6 m-3">
                <h1 className="text-3xl font-bold text-center">About Us</h1>
            </div>
            <div className="bg-[#D9E4C1] p-6 md:p-10 text-center">
                <p className='max-w-5xl mx-auto leading-7 text-left md:text-center'>
                <span className='font-bold'>ഗ്രീൻ ക്ലീൻ കേരള മിഷൻ <br /></span>
                സുസ്ഥിര  വികസിത  കേരളം എന്ന ലക്ഷ്യം സാക്ഷാൽക്കരിക്കാനായി GCEM Foundation (Green Clean Earth Movement Foundation) 2016 ൽ  പ്രൊഫസർ  ശോഭീന്ദ്രൻ്റെ  നേതൃത്വത്തിൽ ആരംഭിച്ച  പദ്ധതിയാണ് ഗ്രീൻ ക്ലീൻ  കേരള  ഹരിത  മത്സരങ്ങൾ. പരിസ്ഥിതി  ദിനത്തിലും  തുടർന്നും  നടുന്ന വൃക്ഷത്തൈകളുടെ  വിവിധ  ഘട്ടങ്ങളിലുള്ള  വളർച്ച  പ്രകടമാവുന്ന  ഫോട്ടോ  www.GreenCleanEarth.org   എന്ന  വെബ്‌സൈറ്റിൽ  അപ്‌ലോഡ്  ചെയ്താൽ  ഭാഗ്യ  ശാലികൾക്കും, തുടർന്നുള്ള  ഹരിത  മത്സരങ്ങളിൽ  മികച്ച  പ്രകടനം  നടത്തുന്നവർക്കും   പുരസ്കാരങ്ങളും  സമ്മാനങ്ങളും  നൽകുന്ന പദ്ധതിയാണിത്. ഇങ്ങനെ  ഒരു കോടി വൃക്ഷത്തൈകൾ സംരക്ഷിച്ച്, അതിൻറെ  ഓരോ മൂന്ന് മാസത്തെയും  വളർച്ച പ്രകടമാവുന്ന  ഫോട്ടോയും  മറ്റു വിവരങ്ങളും വെബ്സൈറ്റിൽ പ്രസിദ്ധീകരിച്ച്, മത്സരാർത്ഥികൾ  തയ്യാറാക്കുന്ന  സുസ്ഥിര  വികസിത  പ്രൊജക്റ്റ് റിപ്പോർട്ടിനൊപ്പം   UNEP (United Nations Environmental Program) യിലേക്ക് സമർപ്പിക്കുവാനും  ഈ പദ്ധതിയിലൂടെ  ലക്ഷ്യമിടുന്നു.
                </p>
            </div>

            <div className="bg-light-gray p-6 md:p-10 text-center my-2">
                <p className='max-w-5xl mx-auto leading-7 text-left md:text-left'>
                    <span className="font-bold text-lg">ഒന്നാം ഘട്ടം  1000 തൈകൾ - ഗ്രീൻ ക്ലീൻ മന്ദമംഗലം - പൈലറ്റ്  പ്രൊജെക്ട് <br /></span>
                    ഈ ലക്ഷ്യം സാക്ഷാൽക്കരിക്കാൻ വേണ്ടി കോഴിക്കോട് ജില്ലയിലെ കൊയിലാണ്ടി മുൻസിപ്പാലിറ്റിയിലെ ഒന്നാം വാർഡ് ആയ മന്ദ മംഗലം ഗ്രാമത്തെ, തളിർ ജൈവ കൂട്ടായ്മ എന്ന സംഘടനയുടെ സഹകരണത്തോടെ പൈലറ്റ് പ്രൊജക്റ്റ് ആയി ഏറ്റെടുക്കുകയുണ്ടായി. അന്ന്  മന്ദമംഗലം  ഗ്രാമത്തിൽ  നിന്നും  1092  തൈകൾ   സംരക്ഷിച്ച്  അപ്ലോഡ്  ചെയ്യുകയും  ചെയ്തു . കേവലം ഒരു വാർഡിൽ നിന്നും ആയിരത്തിലധികം തൈകൾ അപ്‌ലോഡ് ചെയ്യാൻ കഴിയുമെങ്കിൽ 19498 വാർഡുകളുള്ള കേരളത്തിൽ നിന്നും ഒരുകോടി തൈകൾ സംരക്ഷിച്ച് അതിൻറെ ഫോട്ടോ വെബ്‌സൈറ്റിൽ അപ്ലോഡ് ചെയുക എന്നത് സാധ്യമാണ്‌ എന്ന നിഗമനത്തിലെത്തി ആ മഹത്തായ ലക്ഷ്യം സാക്ഷാൽക്കരിക്കാൻ വേണ്ടി പ്രവർത്തനങ്ങൾ നടപ്പിലാക്കിക്കൊണ്ടിരിക്കുന്നു. തുടർന്ന്  പ്രൊഫസർ  ശോഭീന്ദ്രന്റെ  നേതൃത്വത്തിൽ, കോഴിക്കോട്  ജില്ലയിലെ Forestry Club, SCIENCE CLUB, ICDS,  NSS, SPC, SCOUT & GUIDE, JRC, SAVE,   തുടങ്ങിയ  സ്ഥാപനങ്ങളിലെ  പരിസ്ഥിതി  കോർഡിനേറ്റർ മാരെയും   വിദ്യാർത്ഥി  പരിസ്ഥി  സംഘടനപ്രതിനിധികളെയും  ഉൾപ്പെടുത്തി  ഗ്രീൻ ക്ലീൻ  കേരള  മിഷൻ എന്ന  ഒരു  സമിതി  രൂപീകരിക്കുകയും  ചെയ്‌തു . ഈ പദ്ധതി കേരള  മുഖ്യമന്ത്രി  , കോഴിക്കോട് ജില്ലാ  പഞ്ചായത്ത് , സോഷ്യൽ  ഫോറെസ്റ്ററി , കുടുംബശ്രീ  കോഴിക്കോട് ജില്ലാ മിഷൻ , ഇന്ത്യൻ ഓയിൽ  കോർപറേഷൻ  എന്നിവക്ക്  സമർപ്പിക്കുകയും ചെയ്തു. തുടർന്ന് കോഴിക്കോട്  ജില്ലയെ  പൈലറ്റ്  പ്രോജക്ട്  ആയി  തിരഞ്ഞെടുക്കുകയും കോഴിക്കോട് ജില്ലാ പഞ്ചായത്തിന്റെ  നേതൃത്വത്തിൽ ഗ്രീൻ ക്ലീൻ കോഴിക്കോട്  എന്ന പേരിൽ ഒരു പദ്ധതി  ആവിഷ്കരിക്കുകയും  ചെയ്തു. പദ്ധതിയുടെ  ഉത്ഘാടനം  ബഹു ,കേരള   മുഖ്യമന്ത്രി  ശ്രീ പിണറായി  വിജയൻ 16-09-2017  ന്  കോഴിക്കോട്ട്  നിർവഹിക്കുകയും  ചെയ്തു. കോഴിക്കോട്  ജില്ലാ  പഞ്ചായത്ത്  ഈ പദ്ധതിക്കായി  2017 മുതൽ ഓരോ  വർഷവും  പ്രത്യേക ഫണ്ട്  വകയിരുത്തുകയും സോയിൽ   കൺസർവേഷൻ   ഡിപ്പാർട്ടമെന്റ്  മുഖേനെ  ഗ്രീൻ ക്ലീൻ  കേരളാ  മിഷ്യന്റെ  സഹകരണത്തോടെ നടപ്പിൽ  വരുത്തുകയും  ചെയ്യുന്നു. 2021 ൽ  ഈ പദ്ധതിയുടെ  പേര്  ഗ്രീനിങ്  കോഴിക്കോട്  എന്ന്  പുനർ  നാമകരണം  ചെയ്യുകയും പ്രവർത്തനങ്ങൾ  നടന്നു  വരികയും  ചെയ്യുന്നു.
                </p>
                
                <div className="my-8">
                    <img src='images/gce_with_cm.jpg' className=' w-full md:max-w-xl mx-auto rounded-lg' />
                    <p className="text-sm py-4">പൈലറ്റ്  പ്രൊജക്റ്റ്  റിപ്പോർട്ട്  ബഹു  മുഖ്യമന്ത്രിക്ക്  സമർപ്പിക്കുന്നു </p>
                </div>
                <p className='max-w-5xl mx-auto leading-7 text-left md:text-left'>
                    നിലവിൽ മുൻ കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത് പ്രസിഡണ്ട് ശ്രീ ബാബു പറശ്ശേരി ഗ്രീൻ ക്ലീൻ കേരള മിഷൻ. ചെയർമാൻ  ആയും  ജിസം  ഫൌണ്ടേഷൻ  ചെയർമാൻ  മുഹമ്മദ്  ഇഖ്ബാൽ  കൺവീനർ  ആയും  ഹയർ  സെക്കണ്ടറി  അദ്ധ്യാപകൻ  ഷജിൽ യൂ .കെ .കോഴിക്കോട് ഡയറ്റ്  പ്രിൻസിപ്പാൾ  അബ്ദുന്നാസർ  യു .കെ . എന്നിവർ  വൈസ്  ചെയർമാൻ മാർ   ആയും  പ്രവർത്തിക്കുന്നു . കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത്,കോഴിക്കോട് ജില്ലയിലെ സോയിൽ കൺസർവേഷൻഡിപ്പാർട്ട്മെന്റ്, ജില്ലാ  വിദ്യാഭ്യാസ  പരിശീലന  കേന്ദ്രം (DIET), സോഷ്യൽ ഫോറസ്ട്രി, മലയാളം മിഷൻ, സയൻസ് ക്ലബ്, ഗിഫ്റ്റഡ് ചിൽഡ്രൻ പ്രോഗ്രാം,സാമൂഹ്യ ശാസ്ത്രക്ലബ്, ഐടി.ഇ.ടീം. ഹരിത കേരളം മിഷൻ, ശുചിത്വമിഷൻ, കുടുംബശ്രീ, ഐ സി ഡി എസ്,എൻഎസ്എസ്, എസ് പി സി, ജെ ആർസി, സ്കൗട്ട് ആൻഡ് ഗൈഡ്, ശോഭീന്ദ്ര  ഫൗണ്ടേഷൻ , ഇന്ത്യൻ  ഓയിൽ കോർപറേഷൻ , വേൾഡ്  മലയാളീ  ഫെഡറേഷൻ എന്നിവയാണ്  ഗ്രീൻ  ക്ലീൻ  കേരള  മിഷൻറെ  പ്രവർത്തനങ്ങളിൽ  സഹകരിക്കുന്ന  സ്ഥാപനങ്ങൾ . <br /><br />
                    <span className='font-bold text-lg'>ഗ്രീൻ ക്ലീൻ  കേരള  മിഷൻ - അവർഡ് കമ്മിറ്റി<br /></span>
                    ജില്ലയിലെ പാരിസ്ഥിതിക ,  വിദ്യാഭ്യാസ  സാമൂഹിക മേമേഘലയിലെ  വിദഗ്ദ്ധർ  അടങ്ങിയ ഒരു സമിതിയാണ്  മത്സരങ്ങൾക്ക്  മൂല്യ നിർണ്ണയം  നടത്തുവാനും  അവാർഡുകൾ  പ്രഖ്യാപിക്കാനും   നേതൃത്വം നൽകുന്നത് . <br /><br />
                    <span className="font-bold text-lg">GCEM Foundation (Green Clean Earth Movement  Foundation) <br /></span> 
                    നമ്മുടെ  നാടിനെ  സമ്പൂർണ്ണ  സ്വയം  പര്യാപ്തമാക്കുക എന്ന  ലക്ഷ്യം സാക്ഷാൽക്കരിക്കാനായി 2016  ൽ  രൂപീകരിക്കപ്പെട്ട  സന്നദ്ധസംഘടനയാണ് Green Clean Earth Movement  Foundation. പ്രഫസർ  ശോഭീന്ദ്രൻ  ചീഫ്  പേട്രൺ  ആയും  താഴെ കൊടുത്തവർ മെമ്പർമാരായും 2016 ൽ Reg no. 246 / 4 / 16. ആയി കോഴിക്കോട്ട് രജിസ്റ്റർ ചെയ്‌തു.
                </p>
            </div>

        <div className="flex justify-center items-center mt-10">
                <h1 className="text-2xl text-center">Our Team</h1>
            </div>
            {directors.map((director, index) => (
                <div key={index} className="mt-8 bg-light-gray p-5 text-center rounded-lg mx-11 md:mx-40">
                    <div className="bg-light-gray p-10 text-center rounded-lg mx-10 md:mx-40">
                        <p className="text-base mb-2">{director.title}</p>
                        <p className="text-2xl mb-2">{director.name}</p>
                        <p className="text-gray-500">{director.location}</p>
                    </div>
                </div>
            ))}
            <Earth />
            <Footer />
        </>
    )
}

export default AboutUs;
