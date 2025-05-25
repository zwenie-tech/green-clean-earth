import { toast } from "@/components/ui/use-toast";

export const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const apiURL = process.env.NEXT_PUBLIC_API_URL


export const fetchUserData = async (user_id :any, token:any) => {
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

  // export const fetchActivityData = async (token: any,id:any) => {
  //   const headersList = {
  //     "Authorization": `Bearer ${token}`,
  //   };
    
  //   const response = await fetch(`${apiURL}/activity/${id}`, { 
  //     method: "GET",
  //     headers: headersList
  //   });
  
  //   if (await response){
  //     var data = await response.json();
  //   }
   
  //   return data;
  // };


  export const fetchActivityData = async (token: any, id: any) => {
    const headersList = {
        "Authorization": `Bearer ${token}`,
    };

    try {
        const response = await fetch(`${apiURL}/activity/${id}`, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
        // Attempt to extract error message from response body
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

        // Check if the response has content before parsing
        const text = await response.text();
        if (!text) {
            // throw new Error('Response is empty');
            return null;
        }

        // Attempt to parse the JSON content
        const data = JSON.parse(text);
        return data;
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: error.message || "Please try again...",
      });
      console.error("Error:", error);
    }
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
        // Attempt to extract error message from response body
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

    const plantData = await response.json();
    return plantData;

  } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: error.message || "Please try again...",
      });
      console.error("Error:", error);
    }
}


// fetch the clubs for the school from api endpoint
export const fetchClubData = async () => {
    try {
      const response = await fetch(`${apiURL}/clubs`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        // Attempt to extract error message from response body
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
  
      const clubsData = await response.json();
      return clubsData;
  
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: error.message || "Please try again...",
      });
      console.error("Error:", error);
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