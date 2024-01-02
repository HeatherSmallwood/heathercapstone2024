import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Signup';
import Home from './Home';
import SignIn from './SignIn';
import UserProfile from "./UserProfile";

const App = () => {
  return (
  
<BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sign-up' element={<Signup />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path='/:username' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>

  );	
};

export default App;
