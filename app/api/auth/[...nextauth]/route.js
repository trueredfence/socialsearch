import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user';



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],    
    session: {
      strategy: "jwt",
      maxAge: 10 * 60,   
    },
    jwt: {        
        maxAge: 10 * 60,        
    },
    callbacks: {
      // This will be use if other auth provider is used
      async signIn({ account, profile, user, credentials }) {
       
        try {
            if(profile){
                await connectToDB();
                // check if user already exists
                const userExists = await User.findOne({ email: profile.email });                
                // if not, create a new document and save user in MongoDB
                if (userExists) {                  
                    if(!userExists.usrename){                                          
                      userExists.username = profile.name.replace(/ /g, "").replace("_", "").replace(".", "").toLowerCase()                   
                      userExists.image =  profile.picture,  
                      await userExists.save(); 
                    }
                    return true;
                }
            }  
          return null
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
          return false
        }
      },
      async jwt ({ token, user }){                
          if(user){
              token = { user }
          }   
          
          return Promise.resolve(token) 
      },

      async session({ session, token, user }) {
        
        const sessionUser = await User.findOne({ email: token.user.email });
        
          if(token.user){ 
              if(session.user){
                  session.user.name = token.user.name   
                  session.user.id = sessionUser._id.toString();
                  session.user.image = sessionUser.image
              }
          }                               
          return Promise.resolve(session)
      },
    }
  })
  
  export { handler as GET, handler as POST }