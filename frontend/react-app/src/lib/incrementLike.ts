
export const incrementLikes = async (post_id:string,isLiked:boolean) => {
    try {
      const response = await fetch(`/api/post/${post_id}/likes`, {
        method: 'POST',
        body:JSON.stringify(isLiked),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to create account. Please try again.');
      }

    } catch (error) {
      const err = error as Error;
      throw (err.message || 'An error occurred. Please try again.');
    }
  };