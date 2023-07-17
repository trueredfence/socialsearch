'use client'
import { useState } from "react";
import ResultCard from "@components/ResultCard_back";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ResultCardList = ({ data }) => {

    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <ResultCardCard
            key={post._id}
            post={post}            
          />
        ))}
      </div>
    );
  };

const Searchresult = () => {
    const router = useRouter();
    const { data: session } = useSession(); 
    const [searchText, setSearchText] = useState("")       
    const [searchedResults, setSearchedResults] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [queryType, setQueryType] = useState(null)

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        const query = searchText
        if(validateEmail(searchText)){
          setQueryType("email")
          const query = searchText.toString().toLowerCase()
        }else{
          setQueryType("mobile")
          const query = searchText
        }
        try {
            const response = await fetch("/api/search", {
              method: "POST",
              body: JSON.stringify({
                query: query,
                type: queryType,
                user: session?.user.id
              }),
            });
            const data = await response.json(); 
            if (response.ok) {              
              setSearchedResults(data)  
              router.push("/");
            }
          } catch (error) {
            console.log(error);
            setSearchedResults([])
          } finally {            
            setIsSubmitting(false);
          }
        
    }
    console.log(searchedResults)
    return (
        (session?.user &&
        <section className='feed'>
          <form className='relative w-full flex-center' onSubmit={handleSubmit}>
              <input
              type='text'
              placeholder='Search with email & mobile number'
              onChange={({ target }) =>
              setSearchText(target.value)
              }
              value={searchText} 
              //TODO:this need to be verify from old codes
              required
              className='search_input peer'
              />
              <button type="submit">Submit</button>
          </form> 
          {searchedResults && (
              <ResultCardList
              data={searchedResults}                
              />
          )} 
        </section>
        )
    )
}

export default Searchresult