import { useEffect, useState } from 'react';
import './navigation.css'
import { HashLink } from 'react-router-hash-link';

const Navigation = () => {

  const [nav, setNav] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    setId(sessionStorage.getItem('user'))
  }, [])

  return (
    <>
      <div className="controls-nav">
        <button className='control-btn' onClick={() => setNav(!nav)}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div className={`menu ${nav ? "open" : ""}`}>
        <HashLink to="/">Home</HashLink>
        <HashLink to="/create-blog">Create blog</HashLink>
        <HashLink to={`/dashboard/${id}`} className={`${id ? "" : "d-none"}`}>Dashboard</HashLink>
        <HashLink to="/login">Login</HashLink>
      </div>
    </>
  );
};

export default Navigation;