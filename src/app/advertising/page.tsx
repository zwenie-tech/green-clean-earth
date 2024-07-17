import React from 'react'
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
const advertising =()=>{
    return(
        <>
        <NavigationBar/>
        <div className="flex justify-center items-center mt-6" >
                <h1 className="text-4xl font-bold text-center item-center" >Advertising Option</h1>
        </div>
        <div className="mt-10 mx-10 md:mx-40">
                <table className="min-w-full bg-light-gray rounded-lg overflow-hidden">
                    <thead>
                        <tr className=" border-b-2 border-gray-400 bg-gray-300">
                            <th className="py-2 px-4 border-r-2 border-gray-400 text-left">Ad Type</th>
                            <th className="py-2 px-4 border-r-2 border-gray-400 text-left">Facility</th>
                            <th className="py-2 px-4 border-r-2 border-gray-400 text-left">Tariff</th>
                            <th className="py-2 px-4 border-gray-400 text-left">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className="py-2 px-4 border-r-2 border-gray-400">Event Sponsoring</td>
                            <td className="py-2 px-4 border-r-2 border-gray-400">You can sponsor events</td>
                            <td className="py-2 px-4 border-r-2 border-gray-400">As per event</td>
                            <td className="py-2 px-4"></td>
                        </tr>
                        <tr >
                            <td className="py-2 px-4 border-r-2 border-gray-400">Event Sponsoring</td>
                            <td className="py-2 px-4 border-r-2 border-gray-400">You can sponsor events</td>
                            <td className="py-2 px-4 border-r-2 border-gray-400">As per event</td>
                            <td className="py-2 px-4"></td>
                        </tr>
                        <tr >
                            <td className="py-2 px-4 border-r-2 border-gray-400">Event Sponsoring</td>
                            <td className="py-2 px-4 border-r-2 border-gray-400">You can sponsor events</td>
                            <td className="py-2 px-4 border-r-2 border-gray-400">As per event</td>
                            <td className="py-2 px-4"></td>
                        </tr>      
                    </tbody>
                </table>
            </div>

        <Footer/>
        </>
        
    )
}
export default advertising;
