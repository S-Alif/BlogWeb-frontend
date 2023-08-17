import { useEffect, useState } from 'react';
import './navigation.css'
import { HashLink } from 'react-router-hash-link';
import Swal from 'sweetalert2';

const Navigation = () => {

  const [nav, setNav] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    setId(sessionStorage.getItem('user'))
  }, [])

  let logout = () => {
    Swal.fire({
      icon:'question',
      text:"Do you want to log out ?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'logout',
      confirmButtonColor: "red"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        setTimeout(() => {
          window.location.replace('/')
        }, 2000)
      }
    })
  }

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
        <HashLink to="/login" className={`${id ? "d-none" : ""}`}>Login</HashLink>
        <button type='button' className={`btn ${id ? "" : "d-none"}`} onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Navigation;