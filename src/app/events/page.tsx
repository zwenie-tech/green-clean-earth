"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '@/components/navigationBar';
import PageTitle from '@/components/sm/pageTitle';
import GceBadge from '@/components/gceBadge';
import Footer from '@/components/footer';
import { apiURL } from '../requestsapi/request';


// Define the interface for a single event
interface Event {
  id: number;
  event_heading: string;
  event_body: string;
  image_link: string;
  location: string | null;
  created_time: string;
  is_deleted: number;
}

// Define the interface for the API response
interface EventsApiResponse {
  events: Event[];
  success: boolean;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/common/events?limit=100000000000`); 
        const dataall = await responseall.json();
   
        setTotalPages(Math.ceil(dataall.events.length / itemsPerPage));
      }
      fetchfirstData();
    }, []);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
  
        setCurrentPage(newPage);
      }
    }
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiURL}/common/events?page=${currentPage}&limit=${itemsPerPage}`);
        const data: EventsApiResponse = await response.json();
        
        if (data && data.success) {
          setEvents(data.events);
        } else {
          console.error('Failed to fetch events:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [currentPage]);


  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar />
      <div className='mx-2 mt-6'>
        <PageTitle title='Events and News' />
        <div className="flex flex-col gap-4">
          <div className="">
            {
              events.length === 0 ? (
                <center>

                  <h1 className='font-bold m-44'>No events available</h1>
                </center>
              ) : (
                events.slice().reverse().map((event) => {
                  return (
                    <div key={event.id} className='flex flex-col gap-2 my-2 md:my-4 mx-auto p-4 max-w-screen-xl bg-light-gray rounded-lg shadow-md'>
                      <h2 className='text-xl font-bold'>{event.event_heading}</h2>
                      <div className="flex flex-col md:flex-row gap-4"> 
                        <div className="min-w-fit flex flex-col gap-4 ">
                          {event.image_link ? (
                            <a href={`/events/${event.id}?slug=${event.id}`}>
                            <img src={event.image_link} alt="Event Image" className="w-full md:h-52 md:w-52 object-cover bg-primary" />
                            </a>
                          ) : (
                            <div className="h-52 w-52 bg-primary"></div>
                          )}
                          <p className='text-left md:text-center'>{new Date(event.created_time).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className=' text-justify p-2 md:p-5'>{event.event_body}</p>
                          {event.event_body.length > 100 && (
                      <a href={`/events/${event.id}?slug=${event.id}`} className='self-start bg-white px-5 py-2 rounded-2xl'>Read more</a>
                    )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 my-4">
        <button
        className={currentPage === 1 ? 
          "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
        : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
        }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => {
            handlePageChange(currentPage + 1) 
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <GceBadge />
      <Footer />
    </main>
  );
}

export default Events;
