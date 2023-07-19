import { connectToDB } from "@utils/database";
import  User  from "@models/user"
import { NextResponse } from 'next/server'
import { fetchSocialDetails } from "@utils";
export const POST = async (request) => {
    const { query, type, user } = await request.json();    
    let url
    let userData
    if(type == "email"){
      console.log(type);
      url = "https://api.seon.io/SeonRestService/email-api/v2.2/"+query
    }
    if(type == "mobile"){
      url = "https://api.seon.io/SeonRestService/phone-api/v1.4/"+query
    }
    
    try {       
      await connectToDB();
      const userExists = await User.findById(user); 
        if(userExists){
          const apiKey = userExists['api']
          const headers = {
                    'X-API-KEY': apiKey,
                    'Content-Type':'application/json'
                }
          try {     
            const response = await fetchSocialDetails(
              {
                url:url,
                headers:headers
              }
            )          
            userData = response
        }catch (error) {
            console.log(error);
            userData = []
        } 
      }     
      return new Response(JSON.stringify(userData), { status: 200 })
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}