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
                <p>
                    Gcem Foundation - A non-profitable organization to make earth smart green and clean. Reg no. 246 / 4 / 16.<br />
                    Haritha puraskaram Sammanapddathi Vrikshathai selfi Malsaram is a GCEM Foundation project for saving the earth supported by www.a2z4home.com.<br />
                    It is a &quot;Prize win&quot; program for those who are ready to plant trees in Kerala. Plant a new tree and upload the images every 3 months.<br />
                    Prize winners will be selected by draw in each period. This is to encourage people to plant trees against global warming.
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
