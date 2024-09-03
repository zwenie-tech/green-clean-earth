import React from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
import Earth from '@/components/earth'

const AboutUs = () => {
    const directors = [
        { title: "Director & Chief Patron", name: "Prof. Shobheendran Master", location: "Kakkody" },
        { title: "Executive Director - 9645 119 474", name: "Muhammad Iqubal.K", location: "Koduvally" },
        { title: "Director & Chairman", name: "Dr. Yahyakhan", location: "Kozhikode" },
        { title: "Director & Finance coordinator", name: "Muhammad Ismail master.P.P", location: "Narikkuni" },
        { title: "Director & Finance coordinator", name: "Ismail", location: "Kottakkal" },
        { title: "Director & Marketing coordinator", name: "Anvar Sadik", location: "Palazhi" },
        { title: "Director & Event coordinator", name: "Ashraf.K", location: "Koduvally" },
        { title: "Director & Event coordinator", name: "Satheeshan Koroth", location: "Nanmanada" },
        { title: "Director & Event coordinator", name: "Naser.Pattani", location: "Koduvally" },
        { title: "Director & Event coordinator", name: "V.P Asraf", location: "Koduvally" },
        { title: "Director & Publicity-Coordinator", name: "Shafeek.K.C", location: "Koduvally" },
        { title: "Director & Publicity-Coordinator", name: "Ansar.N.K", location: "Kozhikode" },
        { title: "Director", name: "Prashob.O", location: "Kozhikode" },
        { title: "Director", name: "Faizal.K", location: "Kattangal" },
        { title: "Director", name: "Shafeek", location: "Malappuram" },
        { title: "Director", name: "Farooq R.K", location: "Koduvally" },
        { title: "Director", name: "Smmas.P K", location: "Narikkini" },
        { title: "Director", name: "Muhammad Mirzah.K", location: "Koduvally" }
    ];

    return (
        <>
            <NavigationBar />
            <div className="flex justify-center items-center mt-6 m-3">
                <h1 className="text-3xl font-bold text-center">About Us</h1>
            </div>
            <div className="bg-[#D9E4C1] p-10 text-center">
                <p className='max-w-5xl mx-auto leading-7'>
                ഗ്രീൻ  ക്ലീൻ  കേരള  മിഷൻ.
                സുസ്ഥിര  വികസിത  കേരളം എന്ന ലക്‌ഷ്യം സാക്ഷാൽക്കരിക്കാനായി GCEM Foundation (Green Clean Earth Movement Foundation) 2016 ൽ  പ്രൊഫസർ  ശോഭീന്ദ്രൻ്റെ  നേതൃത്വത്തിൽ ആരംഭിച്ച  പദ്ധതിയാണ് ഗ്രീൻ ക്ലീൻ  കേരള  ഹരിത  മത്സരങ്ങൾ.
                പരിസ്ഥിതി  ദിനത്തിലും  തുടർന്നും  നടുന്ന വൃക്ഷത്തൈകളുടെ  വിവിധ  ഘട്ടങ്ങളിലുള്ള  വളർച്ച  പ്രകടമാവുന്ന  ഫോട്ടോ  www.GreenCleanEarth.org   എന്ന  വെബ്‌സൈറ്റിൽ  അപ്‌ലോഡ്  ചെയ്താൽ  ഭാഗ്യ  ശാലികൾക്കും, തുടർന്നുള്ള  ഹരിത  മത്സരങ്ങളിൽ  മികച്ച  പ്രകടനം  നടത്തുന്നവർക്കും   പുരസ്കാരങ്ങളും  സമ്മാനങ്ങളും  നൽകുന്ന പദ്ധതിയാണിത്.
                ഇങ്ങനെ  ഒരു കോടി വൃക്ഷത്തൈകൾ സംരക്ഷിച്ച്, അതിൻറെ  ഓരോ മൂന്ന് മാസത്തെയും  വളർച്ച പ്രകടമാവുന്ന  ഫോട്ടോയും  മറ്റു വിവരങ്ങളും വെബ്സൈറ്റിൽ പ്രസിദ്ധീകരിച്ച്, മത്സരാർത്ഥികൾ  തയ്യാറാക്കുന്ന  സുസ്ഥിര  വികസിത  പ്രൊജക്റ്റ് റിപ്പോർട്ടിനൊപ്പം   UNEP (United Nations Environmental Program) യിലേക്ക് സമർപ്പിക്കുവാനും  ഈ പദ്ധതിയിലൂടെ  ലക്ഷ്യമിടുന്നു.
                </p>
            </div>
            <div className="flex justify-center items-center mt-10">
                <h1 className="text-2xl text-center">Our Team</h1>
            </div>
            {directors.map((director, index) => (
                <div key={index} className="mt-8 bg-light-gray p-5 text-center rounded-lg mx-11 md:mx-40">
                    <div className="bg-light-gray p-10 text-center rounded-lg mx-10 md:mx-40">
                        <p className="text-2xl mb-3">{director.title}</p>
                        <p className="text-xl mb-1">{director.name}</p>
                        <p>{director.location}</p>
                    </div>
                </div>
            ))}
            <Earth />
            <Footer />
        </>
    )
}

export default AboutUs;
