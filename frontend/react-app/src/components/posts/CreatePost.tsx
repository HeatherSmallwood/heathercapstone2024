import React, { useState, ChangeEvent } from 'react';
import { addPost } from '../../lib/addPost';
import { convertImageToBase64 } from '../../lib/convertImageTo64';

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({setPosts}) => {
  const user_id = window.localStorage.getItem('user_id');

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [postText, setPostText] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleImageChange = async(e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if(selectedImage)
    {
      const imagePreview=await convertImageToBase64(selectedImage)
      setImagePreview(imagePreview)
      setImage(selectedImage || null);
    }
   
  };

  const handlePostSubmit =async () => {
    // Add logic to handle post submission (e.g., send data to the server)
    let img_base64='some'
    if(image)
        img_base64=await convertImageToBase64(image) as string


    const postData ={content:postText,img_base64:img_base64,likes:0}

    console.log("asba",postData)
    await addPost(user_id as string, postData);
    setPosts((prevPosts)=>([...prevPosts,postData]))

    console.log('Post Text:', postText);
    console.log('Image:', image);
    setPostText('');
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md">
      <h1 className="text-xl font-bold mb-2">Create Post</h1>

      <textarea
        placeholder="What's on your mind?"
        value={postText}
        onChange={handleTextChange}
        className="border p-2 rounded-md resize-none"
      />

      <label htmlFor="imageInput" className="cursor-pointer mt-2 mb-4 text-center bg-blue-500 text-white p-2 rounded-md">
        Upload Image
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

{imagePreview && <img src={imagePreview} alt="Selected" className="mb-2 max-h-40 max-w-full rounded-md" />}

      <button onClick={handlePostSubmit} className="bg-blue-500 text-white py-2 rounded-md">
        Post
      </button>
    </div>
  );
};

export default CreatePost;
