import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigator=useNavigate()
  const [userData, setUserData] = useState({
    username: '',

    password: '',
  
    
  });
  const [error, setError] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

     
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData), // Send all user data in the request body
        });

        console.log("asba",response)
  
        if (!response.ok) {
          throw new Error('Failed to create account. Please try again.');
        }
  
        const responseData = await response.json();
        if (responseData.success === true) {
          setError('')
          window.localStorage.setItem('user_id',responseData?.user_id)
          window.localStorage.setItem('username',responseData?.username)
          navigator('/')
          
        } else {
          setError('Wrong Username or Password, Try Again.');
        }
      }
    
     catch (error) {
      const err = error as Error;
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='flex flex-col gap-4 items-center px-2'>
      <h1>Sign In</h1>
      {error && <p className='text-red-600'>{error}</p>}
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='flex flex-col gap-3 w-full '>
        <input
          type="text"
          placeholder="Enter your Instagram username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />

         <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
   
       
   <button type="submit">Sign In</button>

        </div>

        
      
        {/* Add similar input fields for other user data */}
      </form>
      <div className='flex flex-row gap-3 items-center justify-end'>  <p>Don't Have an Account yet?</p><a href='/sign-up'> <button type='submit' >Sign Up</button></a>
      </div>
     
    </div>
  );
}

export default SignIn;
