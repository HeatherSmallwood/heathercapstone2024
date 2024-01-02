export const getUserPosts = async (user_id: string) => {
  try {
    const response = await fetch(`/api/user/${user_id}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create account. Please try again.');
    }

    const responseData = await response.json();
    console.log("asbaaaa", responseData);
    return responseData;

  } catch (error) {
    const err = error as Error;
    throw (err.message || 'An error occurred. Please try again.');
  }
};
