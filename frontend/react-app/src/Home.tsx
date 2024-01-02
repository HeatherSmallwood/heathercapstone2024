import { useEffect, useState } from "react";
import { getPosts } from "./lib/getPosts";
import LoggedInHome from "./components/home/LoggedInHome";
import NotLoggedInHome from "./components/home/NotLoggedInHome";


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const user_id = window.localStorage.getItem('user_id');


  useEffect(() => {
    const fetchData = async () => {
      if (!user_id) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        await getPosts();
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1>Home</h1>

      {isLoggedIn && user_id ? (
         <LoggedInHome />
        
      ) :<NotLoggedInHome />
      }
    </div>
  );
};

export default Home;
