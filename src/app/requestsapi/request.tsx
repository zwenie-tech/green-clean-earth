
export const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const apiURL = process.env.NEXT_PUBLIC_API_URL


export const fetchUserData = async (user_id :any, token:any) => {
    console.log('Fetching user');
    const headersList = {
      "Authorization": `Bearer ${token}`,
    };
    
    const response = await fetch(`${apiURL}/user/${user_id}`, { 
      method: "GET",
      headers: headersList
    });
    
    const data = await response.json();
    return data;
  };
  

  export const uploadActivityData = async (data: any, token: string | null, id: string | null) => {
    try {
      const response = await fetch(`${apiURL}/activity/new`, { 
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error uploading activity data:", error);
     
    }
  };

  export const fetchActivityData = async (token: any) => {
    console.log('Fetching user');
    const headersList = {
      "Authorization": `Bearer ${token}`,
    };
    
    const response = await fetch(`${apiURL}/activity/all`, { 
      method: "GET",
      headers: headersList
    });
    
    const data = await response.json();
    return data;
  };


export const fetchPlantsData = async (token : string) => {
  try {
    const header = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${apiURL}/uploads/me`, {
      method: 'GET',
      headers: header,
    });

    if (!response.ok) {
      throw new Error(`Error fetching plants: ${response.statusText}`);
    }

    const plantData = await response.json();
    return plantData;

  } catch (error) {
    console.error("Error fetching plants:", error);
    return error;
  }
}


// fetch the clubs for the school from api endpoint
export const fetchClubData = async () => {
    try {
      const response = await fetch(`${apiURL}/clubs`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching plants: ${response.statusText}`);
      }
  
      const clubsData = await response.json();
      return clubsData;
  
    } catch (error) {
      console.error("Error fetching plants:", error);
      return error;
    }
  }

  
export const uploadPlantData = async (data: any, token: string | null) => {
    try {
      const response = await fetch(`${apiURL}/uploads/new`, { 
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error("Error uploading activity data:", error);
      throw error;
    }
  };