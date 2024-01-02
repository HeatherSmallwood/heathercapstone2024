import React, { useState } from 'react';
import InstaData from './InstaData';

function Signup() {
  const [userData, setUserData] = useState({
    username: '',
    imgBase64: '', // Add other required fields here
    fullName: '',
    password: '',
    email: ''
  });

  const [isInstaData, setIsInstaData] = useState(false);
  const [error, setError] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (userData.password !== confirmPassword) {
        setError('Passwords Do Not Match, Please Verify.');
      } else {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData), // Send all user data in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to create account. Please try again.');
        }

        const responseData = await response.json();
        if (responseData.success === true) {
          setError('');
          alert('Your account is created successfully, you can log in now');
        } else {
          alert('Account creation failed, please try again');
        }
      }
    } catch (error) {
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
      <h1>Sign Up</h1>
      {error && <p className='text-red-600'>{error}</p>}

        {!isInstaData ? (
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full '>

          <div className='flex flex-col gap-3 w-full '>
            <input
              type="text"
              placeholder="Enter your Instagram username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter your Full Name"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Your Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value) }}
            />
          </div>
        
          </form>
        ) : <InstaData />}
          <div className='flex flex-row items-center gap-2'>
          <button className='flex-1' type="submit">Sign Up</button>
          <button className='flex-1' onClick={(e) => { e.preventDefault(); setIsInstaData(!isInstaData) }}>{isInstaData ? 'Normal Signup' : 'Use InstaData'}</button>
        </div>

       
     

      <div className='flex flex-row gap-3 items-center justify-end'>
        <p>Already Have an Account ?</p>
        <a href='/sign-in'><button type='submit'>Sign In</button></a>
      </div>
    </div>
  );
}

export default Signup;
