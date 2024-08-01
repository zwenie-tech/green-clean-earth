"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NavigationBar from '@/components/navigationBar';
import PageTitle from '@/components/sm/pageTitle';
import GceBadge from '@/components/gceBadge';
import Footer from '@/components/footer';
import { apiURL } from '@/app/requestsapi/request';

// Define the interfaces
interface Event {
  id: number;
  event_heading: string;
  event_body: string;
  image_link: string;
  location: string | null;
  created_time: string;
  is_deleted: number;
}

interface ApiResponse {
  events: Event[];
  success: boolean;
}

const Events = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("slug");
  
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`${apiURL}/common/events`)
        .then(response => response.json())
        .then((data: ApiResponse) => {
          const foundEvent = data.events.find(event => event.id === parseInt(id as string));
          setEvent(foundEvent || null);
        })
        .catch(error => console.error('Error fetching events:', error));
    }
  }, [id]);

  if (!event) {
    return (
      <main className='min-h-screen flex flex-col'>
        <NavigationBar />
        <div className='mx-2'>
          <PageTitle title='Events and News' />
          <div className='flex flex-col items-center gap-2 mx-4 my-4 md:mx-24 px-4 py-6 bg-light-gray'>
            <h2 className='text-2xl font-semibold'>Loading...</h2>
          </div>
        </div>
        <GceBadge />
        <Footer />
      </main>
    );
  }

  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar />
      <div className='mx-2'>
        <PageTitle title='Events and News' />
        <div className='flex flex-col items-center gap-2 mx-4 my-4 md:mx-24 px-4 py-6 bg-light-gray'>
          <h2 className='text-2xl font-semibold'>{event.event_heading}</h2>
          <img src={event.image_link} alt={event.event_heading} className="h-52 w-80 bg-primary" />
          <p className='text-left md:text-left'>{new Date(event.created_time).toLocaleDateString()}</p>
          <p>{event.event_body}</p>
        </div>
      </div>
      <GceBadge />
      <Footer />
    </main>
  );
};

export default Events;
