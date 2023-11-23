"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@components/Card";

const ResultCardList = ({ data }) => {
  console.log(data);
  const accoutDetails = data.data.account_details;
  let activeAccounts = {};
  for (let i in accoutDetails) {
    if (accoutDetails[i].registered) {
      activeAccounts[i] = accoutDetails[i];
    }
  }
  activeAccounts = Object.entries(activeAccounts);
  return (
    <div className="mt-16 prompt_layout">
      {activeAccounts.map((post, index) => (
        <Card key={index} post={post} />
      ))}
    </div>
  );
};

const Showresult = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setsearchQuery] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [searchedResults, setsearchedResults] = useState([]);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisSubmitting(true);
    let queryType;
    if (validateEmail(searchQuery)) {
      queryType = "email";
    } else {
      queryType = "mobile";
    }
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          query: searchQuery,
          type: queryType,
          user: session?.user.id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setsearchedResults(data);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setsearchedResults([]);
    } finally {
      setsearchQuery("");
      setisSubmitting(false);
    }
  };

  return (
    //TODO:check session.users
    session && (
      <section className="feed">
        <form className="relative w-full flex-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search with email & mobile number"
            onChange={({ target }) => setsearchQuery(target.value)}
            value={searchQuery}
            //TODO:this need to be verify from old codes
            required
            className="search_input"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-1.5 text-sm rounded-r-lg h-10 w=10 bg-primary-orange text-white"
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </form>

        {searchedResults && Object.keys(searchedResults).length >= 1 && (
          <ResultCardList data={searchedResults} />
        )}
      </section>
    )
  );
};

export default Showresult;
