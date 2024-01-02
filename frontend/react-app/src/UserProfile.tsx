import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post from './components/posts/Post';
import { getUserPosts } from './lib/getUserPosts';

const UserProfile = () => {
  const { username } = useParams();

  const [userPosts,setUserPosts]=useState([])
  const navigator=useNavigate()
  useEffect(() => {
    const user_id = window.localStorage.getItem('user_id');
    const fetchData = async () => {
      const posts = await getUserPosts(user_id as string);
      setUserPosts(posts);
    };
  

    if (!user_id) {
      navigator('/sign-in');
    }
    else
    {    fetchData();


    }
  }, [navigator]);

  


  return (
    <div className='flex flex-col gap-3 items-center'>
      <h1>User Profile</h1>
      <h2>Welcome {username}!</h2>

     <a href='/'><button type='submit'>Home</button></a>
     <a href='/sign-in'><button onClick={()=>{
	window.localStorage.removeItem('user_id')
    window.localStorage.removeItem('username')         
        }} type='submit'>Logout</button></a>

{userPosts?.map((post,key) => (
        <Post key={key} post={post} setPosts={setUserPosts}/>
      ))}
    </div>
  );
};

export default UserProfile;
