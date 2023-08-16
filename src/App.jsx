import { HashRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import HomePage from './pages/homepage/HomePage';
import Login from './pages/login-registration/Login';
import Otp from './pages/otp/Otp';
import CreateBlog from './pages/createBlogPage/CreateBlog';
import BlogPage from './pages/blogPage/BlogPage';
import DashBoard from './pages/dashboard/DashBoard';

const App = () => {

  const [email, setEmail] = useState("")

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login mail={setEmail} />} />
          <Route path="/verify" element={<Otp mail={email} />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/update-blog/:id" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/dashboard/:id" element={<DashBoard />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;