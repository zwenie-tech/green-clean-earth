import NavigationBar from '@/components/navigationBar'
import PageTitle from '@/components/sm/pageTitle'
import GceBadge from '@/components/gceBadge'
import Footer from '@/components/footer'
import { Locate, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'


const Contact = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
      <div className=' mx-2'>
        <PageTitle title='Get in touch with us' />
        <div className="max-w-screen-xl mx-auto flex flex-col gap-4">
          <div>
            <h3 className='text-primary text-2xl'>About us</h3>
            <p className='border-l p-2 border-black'>ഭൂമിയെ ഹരിതാഭമാക്കാനും, മാലിന്യ മുക്തമാക്കാനും ജനങ്ങളെ പ്രേരിപ്പിക്കാൻവിവിധ സ്ഥാപങ്ങളുടെയും,സംഘടനകളുടെയും , സഹകരണത്തോടെ GCEM Foundation ആവിഷ്‌കരിച്ച് നടപ്പിൽ വരുത്തുന്ന ഒരു ബഹുജനമുന്നേറ്റമാണ് Green Clean Earth Movement(GCEM).</p>
          </div>
          <div>
            <div className='flex flex-col gap-4'>
              <Link href='mailto:gcemfoundation@gmail.com' className='flex gap-4'>
                <Mail size={30}/>
                <p className='text-lg'>gcemfoundation@gmail.com</p>
              </Link>
              <Link href='tel:+919645964592' className='flex gap-4'>
                <Phone size={30}/>
                <p className='text-lg'>+91 9645 9645 92</p>
              </Link>
              <Link href='' className='flex gap-4'>
                <MapPin size={30}/>
                <p className='text-lg'>M Square Building Pavamani Road Kozhikode, Kerala India</p>
              </Link>
            </div>
            <div className='my-4 p-2'>
              <Link href={''} className='text-primary'>Advertising option</Link>
            </div>
          </div>
          

        </div>
      </div>
      <GceBadge />
      <Footer/>
    </main>
  )
}

export default Contact