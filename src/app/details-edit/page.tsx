"use client";
import React from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
import { useState } from 'react'
const detailsEdit=()=>{
    const [isEditing, setIsEditing] = useState(false);
    const [isgroupEditing, setgroupIsEditing] = useState(false);
    const [iscoordinatorEditing, setcoordinatorEditing] = useState(false);

  const handleAdditionEditClick = () => {
    setIsEditing(true);
  };
  const handleGroupEditClick = () => {
    setgroupIsEditing(true);
  };
  const handlecoordinatorEditClick = () => {
    setcoordinatorEditing(true);
  };
    return(
        <>
        <NavigationBar/>
        <div className="container w-full justify-center">
          <div className="md:flex gap-6">
            {/* Form 1 */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg border-1 border-black shadow-xl bg-light-gray">
              <div className="card p-3">
                <form className='' >
                <div className="flex items-center mb-3 gap-5">
                  <h2 className="mb-0 text-left  text-xl font-bold">Group details</h2>
                  <button type="button" className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                  onClick={handleGroupEditClick }
                  >Edit</button>
                </div>
                  <div className="mb-3 flex  gap-3">
                    <label htmlFor="field1" className="text-lg text-gray w-1/3 ">Name</label>
                    <input type="text" className="h-8 shadow-lg rounded-sm w-2/3 active:border-primary focus:border-primary" id="name"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className="text-lg w-1/3">Category:</label>
                    <input type="text" className="h-8 shadow-lg rounded-sm w-2/3" id="category"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field1" className="text-lg w-1/3">Country</label>
                    <input type="text"  className="h-8 shadow-lg rounded-sm w-2/3" id="country"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className="text-lg w-1/3">State</label>
                    <input type="text" className="h-8 shadow-lg rounded-sm w-2/3" id="state"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field1" className="text-lg w-1/3">District</label>
                    <input type="text"  className="h-8 shadow-lg rounded-sm w-2/3" id="distric"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className="text-lg w-1/3">Corporation</label>
                    <input type="text" className="h-8 shadow-lg rounded-sm w-2/3" id="corporation"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field1" className="text-lg w-1/3">Lsgd</label>
                    <input type="text"  className="h-8 shadow-lg rounded-sm w-2/3" id="lsgd"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className="text-lgl w-1/3">Ward No</label>
                    <input type="text" className="h-8 shadow-lg rounded-sm w-2/3" id="wardno" 
                    disabled={!isgroupEditing}/>
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className="text-lg w-1/3">Location</label>
                    <input type="text" className="h-8 shadow-lg rounded-sm w-2/3" id="location"
                    disabled={!isgroupEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field1" className=" text-lg w-1/3">City</label>
                    <input type="text"  className="h-8 shadow-lg rounded-sm w-2/3" id="city" 
                    disabled={!isgroupEditing}/>
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className=" text-lg w-1/3">Province</label>
                    <input type="text" className="h-8 shadow-lg rounded-sm w-2/3" id="province" 
                    disabled={!isgroupEditing}/>
                  </div>
                  {isgroupEditing && (
                    <div className="flex justify-center">
                      <button 
                        type="submit" 
                        className="btn text-white bg-primary py-2 px-5 rounded-sm shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Form 2 */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg border-1 border-black bg-light-gray shadow-xl">
              <div className="card p-3">
                <form className='' >
                <div className="flex items-center mb-3 gap-5">
                  <h2 className="mb-0 text-left text-xl font-bold">Coordinator details</h2>
                  <button type="button" className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                  onClick={handlecoordinatorEditClick}>Edit</button>
                </div>
                  <div className="mb-3 flex  gap-3">
                    <label htmlFor="field1" className="text-lg w-1/3 ">Coordinator Name</label>
                    <input type="text" className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" id="coordinator"
                    disabled={!iscoordinatorEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className="text-lg w-1/3">Contact Number</label>
                    <input type="text" className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" id="contactno"
                    disabled={!iscoordinatorEditing} />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field1" className="text-lg w-1/3">Profession</label>
                    <input type="text"  className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" id="profes" 
                    disabled={!iscoordinatorEditing}/>
                  </div>
                  {iscoordinatorEditing && (
                    <div className="flex justify-center">
                      <button 
                        type="submit" 
                        className="btn text-white bg-primary py-2 px-5 rounded-sm shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  )}

                  
                </form>
              </div>
              {/**form3 */}
              <div className="card p-3">
                <form className="">
                  <div className="flex items-center mb-3 gap-5">
                    <h2 className="mb-0 text-left text-xl font-bold">Additional details</h2>
                    <button 
                      type="button" 
                      className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                      onClick={handleAdditionEditClick}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="mb-3 flex gap-3">
                    <label htmlFor="field1" className=" text-lg -lg w-1/3">Club list</label>
                    <input 
                      type="text" 
                      className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" 
                      id="clubList" 
                      disabled={!isEditing} 
                    />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field2" className="text-lg  w-1/3">No of student</label>
                    <input 
                      type="text" 
                      className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" 
                      id="noofstnd" 
                      disabled={!isEditing} 
                    />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field3" className="text-lg w-1/3">List of classes</label>
                    <input 
                      type="text" 
                      className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" 
                      id="listofclass" 
                      disabled={!isEditing} 
                    />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field4" className="text-lg w-1/3">Promoting Category</label>
                    <input 
                      type="text" 
                      className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" 
                      id="promo" 
                      disabled={!isEditing} 
                    />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field5" className="text-lg w-1/3">Total Member</label>
                    <input 
                      type="text" 
                      className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" 
                      id="total" 
                      disabled={!isEditing} 
                    />
                  </div>
                  <div className="mb-3 flex justify-between gap-3">
                    <label htmlFor="field6" className="text-lg  w-1/3">No of Member</label>
                    <input 
                      type="text" 
                      className="h-8 mt-1 md:mt-0 shadow-lg rounded-sm w-2/3" 
                      id="noofmember" 
                      disabled={!isEditing} 
                    />
                  </div>
                  {isEditing && (
                    <div className="flex justify-center">
                      <button 
                        type="submit" 
                        className="btn justify-center text-white bg-primary py-2 px-5 rounded-lg shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </form>
              </div>

            </div>
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default detailsEdit;