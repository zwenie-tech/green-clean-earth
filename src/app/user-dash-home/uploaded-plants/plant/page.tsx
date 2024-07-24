
import Footer from '@/components/footer'
import GceBadge from '@/components/gceBadge'
import NavigationBar from '@/components/navigationBar'
import PageTitle from '@/components/sm/pageTitle'
import { DialogEditPlant } from './dialog_edit_plant'

const Plant = ({ searchParams }: any) => {
  const plant =
    {
      'tree':'39468',
      'planter':'Lorem ipsum',
      'uploader':'Lorem ipsum',
      'image1':'',
      'image2':'',
      'image3':'',
      'image4':'',
    };
  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
      <div className='mx-2'>
        <PageTitle title={`Tree: ${searchParams.tree}`} />
      </div>  
      <div className='p-4 md:p-8 max-w-6xl mx-auto'>
        <div>
          <div className='flex flex-col flex-wrap md:flex-row gap-3 py-2 mb-2'>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              { plant.image1 }
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              { plant.image1 }
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              { plant.image1 }
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              { plant.image1 }
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-light-gray p-4 md:p-6 rounded-3xl">
            <div className='self-end text-primary'>
              <DialogEditPlant/>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{ plant.planter }</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GceBadge />
      <Footer/>
    </main>
  )
}

export default Plant