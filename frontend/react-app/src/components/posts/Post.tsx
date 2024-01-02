import React, { useEffect, useState } from 'react';
import { PostData } from '../../lib/types';
import { deletePost } from '../../lib/deletePost';
import { editPost } from '../../lib/EditPost';
import { incrementLikes } from '../../lib/incrementLike';

interface PostProps {
  post: PostData;
  setPosts: (posts: PostData[]) => void;

}

const Post: React.FC<PostProps> = ({ post,setPosts}) => {
  const user_id=localStorage.getItem('user_id')
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  useEffect(()=>{console.log("asba",post)},[post])

  const handleLike = async() => {
    // Simulate toggling like state
    setIsLiked((prevIsLiked) => !prevIsLiked);

    // Simulate updating likes count
    setLikes((prevLikes) => (isLiked ? (prevLikes??0) - 1 : (prevLikes??0) + 1));
    await incrementLikes(post.id as string,isLiked)
  };

  const handleDelete = async () => {
    try {
      setPosts((prevPosts)=>(prevPosts?.filter((homePost)=>homePost.id!=post.id)))

      await deletePost(post.id as string);
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleModify = async () => {
    try {
      setIsEditing(false);
      await editPost(post.id, { ...post, content: editedContent });
      
    } catch (error) {
      console.error('Error editing post:', error.message);
    }
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow-md">
      {/* Post Content */}
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="border p-2 rounded-md resize-none mb-2"
        ></textarea>
      ) : (
        <p className="text-gray-800 mb-2">{editedContent}</p>
      )}

      {/* Post Image */}
      {post.img_base64 && (
        <img
          src={post.img_base64}
          alt="Post"
          className="max-h-60 w-full object-cover rounded-md mb-2"
        />
      )}

      {/* Like Button */}
      <div className="flex justify-between">
      <button
        onClick={handleLike}
        className={`flex items-center text-red-500 ${isLiked ? 'text-red-600' : ''}`}
      >
        {isLiked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.75-8.55 12.54L12 21.35z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.75-8.55 12.54L12 21.35z"
            />
          </svg>
        )}
        {likes} {likes === 1 ? 'like' : 'likes'}
      </button>

      {/* Edit and Delete Buttons */}
     {(post?.user_id==null ||user_id ==post?.user_id) &&
      <div className='flex flex-row gap-2'>
      {isEditing ? (
        <button onClick={handleModify} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Edit
        </button>
      )}

      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Delete
      </button>
      </div>}
    
      </div>
    </div>
  );
};

export default Post;
