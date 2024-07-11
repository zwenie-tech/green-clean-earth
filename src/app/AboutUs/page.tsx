import React from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
import Earth from '@/components/earth'
const aboutus =()=>{
    return(
        <>
            <NavigationBar />
            <div className="flex justify-center items-center mt-10">
                <h1 className="text-3xl  text-center">About Us</h1>
            </div>
            <div className="bg-[#D9E4C1] p-10 text-center">
                <p>
                    Gcem Foundation - A non-profitable organization to make earth smart green and clean. Reg no. 246 / 4 / 16.<br />
                    Haritha puraskaram Sammanapddathi Vrikshathai selfi Malsaram is a GCEM Foundation project for saving the earth supported by www.a2z4home.com.<br />
                    It is a "Prize win" program for those who are ready to plant trees in Kerala. Plant a new tree and upload the images every 3 months.<br />
                    Prize winners will be selected by draw in each period. This is to encourage people to plant trees against global warming.
                </p>
            </div>
            <div className="flex justify-center items-center mt-10">
                <h1 className="text-3xl  text-center">Our Team</h1>
            </div>
            <div className="mt-8 bg-light-gray p-10 text-center rounded-lg mx-10 md:mx-40">
                <p className="text-2xl mb-5">Director & Chief Patron</p>
                <p className="text-2xl">Prof. Shobheendran Master</p>
                <p>Kakkady</p>
            </div>
            <div className="mt-8 bg-light-gray p-10 text-center rounded-lg mx-15 md:mx-40">
                <p className="text-2xl mb-5">Director & Chief Patron</p>
                <p className="text-2xl">Prof. Shobheendran Master</p>
                <p>Kakkady</p>
            </div>
            <div className="mt-8 bg-light-gray p-10 text-center rounded-lg mx-10 md:mx-40">
                <p className="text-2xl mb-5">Director & Chief Patron</p>
                <p className="text-2xl">Prof. Shobheendran Master</p>
                <p>Kakkady</p>
            </div>

            <Earth />
            <Footer />
        </>
    )
}
export default aboutus;