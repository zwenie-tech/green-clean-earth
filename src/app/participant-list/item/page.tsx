import PageTitle from "@/components/sm/pageTitle"


const Item = () => {
  const item = {
    up_file: 'string',
    up_id: 1,
    up_tree_name: 'string',
    up_date: 'string',
    up_planter: 'string',
    up_name: 'string',
  };
  return (
    <>
      <PageTitle title={`Tree number: ${ item.up_id }`} />
      <div className="rounded-lg shadow-lg max-w-screen-lg mx-auto">
        <div className="rounded-lg border">
          
        <div className='flex flex-col flex-wrap md:flex-row gap-3 py-2 mb-2'>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {item.up_file && <img src={`${item.up_file}`} alt='' width={200} height={200} />}
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {item.up_file && <img src={`${item.up_file}`} alt='' width={200} height={200} />}
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {item.up_file && <img src={`${item.up_file}`} alt='' width={200} height={200} />}
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {item.up_file && <img src={`${item.up_file}`} alt='' width={200} height={200} />}
            </div>
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 rounded-3xl">
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Planter name: </div>
              <div className="text-sm">{item.up_planter}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Uploader name: </div>
              <div className="text-sm">{item.up_name}</div>
            </div>
            <div className="flex ml-2 mt-2  gap-2">
              <div className="text-sm pl-5 mb-2">Tree name: </div>
              <div className="text-sm">{item.up_tree_name}</div>
            </div>
            
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Group code: </div>
              <div className="text-sm">....</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">District: </div>
              <div className="text-sm">....</div>
            </div>
            <div className="flex ml-2 mt-2  gap-2">
              <div className="text-sm pl-5 mb-2">LSGD Type: </div>
              <div className="text-sm">....</div>
            </div>

            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">LSGD Name: </div>
              <div className="text-sm">....</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Coupon Number: </div>
              <div className="text-sm">....</div>
            </div>
            <div className="flex ml-2 mt-2  gap-2">
              <div className="text-sm pl-5 mb-2">Tree Scientific Name: </div>
              <div className="text-sm">....</div>
            </div>

            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Landmark: </div>
              <div className="text-sm">....</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Plant Source: </div>
              <div className="text-sm">....</div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Item