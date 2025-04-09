'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NavigationBar from '@/components/navigationBar';
import PageTitle from '@/components/sm/pageTitle';
import GceBadge from '@/components/gceBadge';
import Footer from '@/components/footer';
import { apiURL } from '@/app/requestsapi/request';
import { Share2, X } from 'lucide-react';

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
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`${apiURL}/common/event/${id}`)
        .then(response => response.json())
        .then((data: ApiResponse) => {
          const firstEvent = Array.isArray(data.events) ? data.events[0] : null;
          setEvent(firstEvent);
        })
        .catch(error => console.error('Error fetching event:', error));
    }
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.event_heading,
          text: event?.event_heading,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowPopup(true);
    }
  };

  const handleCopy = async () => {
    try {
      const url = window.location.href;
  
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
  
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  

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
        <div className='flex flex-col items-center gap-2 mx-4 my-4 md:mx-24 px-4 py-6 rounded-md bg-light-gray'>
          <h2 className='text-2xl font-semibold'>{event.event_heading}</h2>
          <img src={event.image_link} alt={event.event_heading} className="h-52 w-80 bg-primary" />
          <div className="flex gap-6 py-2">
            <p className='text-left md:text-left'>{new Date(event.created_time).toLocaleDateString()}</p>
            <button onClick={handleShare} className="flex gap-2 text-primary">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
          <p>{event.event_body}</p>
        </div>
      </div>

      {/* Share fallback popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-2">Share this event</h3>
            <input
              type="text"
              readOnly
              value={window.location.href}
              className="w-full p-2 border rounded text-sm mb-2"
            />
            <button
              onClick={handleCopy}
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      )}

      <GceBadge />
      <Footer />
    </main>
  );
};

export default Events;
