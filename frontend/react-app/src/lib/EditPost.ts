import { PostData } from "./types";

export const editPost = async (post_id:string,postData:PostData) => {
    try {
      const response = await fetch(`/api/post/${post_id}`, {
        method: 'PUT',
        body:JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("asba", response);

      if (!response.ok) {
        throw new Error('Failed to create account. Please try again.');
      }

      const responseData = await response.json();
      if (responseData.success === true) {
        console.log("asba", responseData);
        // setPosts(responseData)
      } else {
        throw new Error('No Posts');
      }
    } catch (error) {
      const err = error as Error;
      throw (err.message || 'An error occurred. Please try again.');
    }
  };