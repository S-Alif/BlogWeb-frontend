import { useState } from "react";
import { useNavigate } from "react-router-dom";


import Swal from 'sweetalert2'
import axios from 'axios'
import baseUrl from './../../components/Url';

const Login = ({mail}) => {

  const navigate = useNavigate()

  // states
  const [panel, setPanel] = useState(0)
  const [logMail, setLogMail] = useState("")
  const [logPass, setLogPass] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [regMail, setRegMail] = useState("")
  const [regPass, setRegPass] = useState("")

  // validation
  let validateEmail = (mail) => {

    if (mail == "") {
      return false
    }
    else if (mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return true
    }
    else {
      return false
    }
  }

  // send email
  let sendOtp = async () => {
    await axios.post(`${baseUrl}/send-otp/${regMail}`)
        .then(res => {
          if(res.data['status'] == 1){
            Swal.fire({
              icon: "info",
              text: "A verification code has been sent to your emai account",
              timer: 3000,
              showConfirmButton: false
            })

            mail(regMail)

            setFname("")
            setLname("")
            setRegMail("")
            setRegPass("")

            setTimeout(() => {
              navigate(("/verify"), { replace: true })
            }, 4000)
          }
          else{
            Swal.fire({
              icon: "error",
              text: "Could not send email",
              timer: 3000,
              showConfirmButton: true
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  // send the data
  let sendData = async (data) => {
    axios.post(baseUrl+'/register', data)
      .then((res) => {
        if (res.data['status'] == 1) {
          
          Swal.fire({
            icon: 'success',
            text: "Your registration is successfull",
            timer: 2000,
            showConfirmButton: false
          })

          sendOtp()
        }
        else {
          Swal.fire({
            icon: 'error',
            text: "Your registration failed"
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // validate data
  let validateData = (e) => {
    e.preventDefault()
    
    if(fname.trim() == "" || lname.trim() == ""){
      Swal.fire({
        icon: 'error',
        text: 'First name or last name cannot be empty'
      })
      return
    }
    else if (fname.trim().length <= 2 || lname.trim().length <= 2){
      Swal.fire({
        icon: 'error',
        text: 'First name or last name cannot be less than three characters'
      })

      return
    }
    else if(!validateEmail(regMail)){
      Swal.fire({
        icon: 'error',
        text: 'Please enter a valid email'
      })
    }
    else if(regPass.length < 8 || regPass == ""){
      Swal.fire({
        icon: 'error',
        text: 'password cannot be less than 8 characters'
      })
    }
    else{
      let data = {
        email: regMail,
        password: regPass,
        first_name: fname,
        last_name: lname
      }
      sendData(data)     
    }
  }

  // login
  let login = async (e) => {
    e.preventDefault()

    let data = {
      email: logMail,
      password: logPass
    }

    await axios.post(`${baseUrl}/login/`, data)
      .then(res => {
        if(res.data['status'] == 1){
          Swal.fire({
            icon: "success",
            text: "Login Successfull",
            timer: 3000,
            showConfirmButton: false
          })

          sessionStorage.setItem('token', res.data['data'])
          sessionStorage.setItem('user', res.data['id'])

          setLogMail("")
          setLogPass("")

          setTimeout(() => {
            navigate(("/"), {replace: true})
          }, 4500)
        }
        else{
          Swal.fire({
            icon: "error",
            text: "Login Failed",
            timer: 3000,
            showConfirmButton: false
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <>
      <section className="login-register">
        <div className="content">
          <div className="controls text-center border-bottom border-2 mb-4">
            <button type="button" className={`btn border border-0 rounded-0 fw-bold pb-3 fs-5 ${panel == 0 ? "text-success" : ""}`} onClick={() => setPanel(0)}>Login</button>
            <button type="button" className={`btn border border-0 rounded-0 fw-bold pb-3 fs-5 ${panel == 1 ? "text-primary" : ""}`} onClick={() => setPanel(1)}>Registration</button>
          </div>

          <div className={`login-panel pt-1 ${panel == 0 ? "" : "d-none"}`}>
            <form action="" onSubmit={login}>
              <input type="email" className="form-control mt-3 text-center" placeholder="Your email" required value={logMail} onChange={(e) => setLogMail(e.target.value)} />
              <input type="password" className="form-control mt-3 text-center" placeholder="Your password" required value={logPass} onChange={(e) => setLogPass(e.target.value)} />

              <div className="button text-center pt-4">
                <button className="btn btn-success fw-bold">Login</button>
              </div>
            </form>            
          </div>

          <div className={`register-panel ${panel == 1 ? "" : "d-none"}`}>
            <form action="" onSubmit={validateData}>
              <div className="row">
                <div className="col-lg-6 col-md-6"><input type="text" className="form-control mt-3 text-center fw-bold" placeholder="First name" value={fname} onChange={(e) => setFname(e.target.value)} /></div>
                <div className="col-lg-6 col-md-6"><input type="text" className="form-control mt-3 text-center fw-bold" placeholder="Last name" value={lname} onChange={(e) => setLname(e.target.value)} /></div>
              </div>
              <input type="email" className="form-control mt-3 text-center fw-bold" placeholder="email" value={regMail} onChange={(e) => setRegMail(e.target.value)} />
              <input type="password" className="form-control mt-3 text-center fw-bold" placeholder="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} />

              <div className="button text-center pt-4">
                <button className="btn btn-success fw-bold">Register</button>
              </div>
            </form>            
          </div>

          <div className="reset-pass text-end pt-4 mt-2">
            <div className="blockquote-footer mb-0">
              <button className="fw-medium btn border border-0 link text-primary p-0 m-0">Forgot Password</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;