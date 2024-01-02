import { useEffect, useState } from "react";
import CreatePost from "../posts/CreatePost";
import { getPosts } from "../../lib/getPosts";
import Post from "../posts/Post";

const LoggedInHome = () => {
  const username = window.localStorage.getItem('username');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="flex flex-col gap-5 items-center">
      <a href={`/${username}`}>
        <button type="submit">Profile</button>
      </a>
      <a href="/sign-in">
        <button onClick={() => {
          window.localStorage.removeItem('user_id');
          window.localStorage.removeItem('username');
        }} type="submit">Logout</button>
      </a>


      <CreatePost setPosts={setPosts}  />
 

      {posts?.map((post,key) => (
        <Post key={key} post={post} setPosts={setPosts}/>
      ))}
    </div>
  );
}

export default LoggedInHome;
