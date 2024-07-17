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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiURL}/common/events`);
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
  }, []);


  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar />
      <div className='mx-2'>
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
                    <div key={event.id} className='flex flex-col gap-2 mx-4 my-4 md:mx-16 p-4 bg-light-gray'>
                      <h2 className='text-xl font-bold'>{event.event_heading}</h2>
                      <div className="flex flex-col md:flex-row gap-4"> 
                        <div className="flex flex-col gap-4">
                          {event.image_link ? (
                            <a href={`/events/${event.id}?slug=${event.id}`}>
                            <img src={event.image_link} alt="Event Image" className="h-52 w-52 object-cover bg-primary" />
                            </a>
                          ) : (
                            <div className="h-52 w-52 bg-primary"></div>
                          )}
                          <p className='text-left md:text-center'>{new Date(event.created_time).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className=' text-justify p-5'>{event.event_body}</p>
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
      <GceBadge />
      <Footer />
    </main>
  );
}

export default Events;
