import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import baseUrl from "../../components/Url";

const Otp = ({mail}) => {

  const [otp, setOtp] = useState("")
  let navigate = useNavigate()

  let verify = async (e) => {
    
    e.preventDefault()

    await axios.get(`${baseUrl}/verify-otp/${mail}/${otp}`)
      .then(res => {
        if (res.data["status"] == 1) {
          Swal.fire({
            icon: "success",
            text: "Account Verified",
            showConfirmButton: false,
            timer: 3000
          })

          setOtp("")

          setTimeout(() => {
            navigate("/login", { replace: true })
          }, 4500)
        }
        else {
          Swal.fire({
            icon: 'error',
            text: `${res.data['data']}`,
            showConfirmButton: false,
            timer: 3000
          })
        }
      })
  }

  return (
    <>
      <section className="otp-verify">
        <div className="content">
          <h1 className="fs-4 fw-bold">Verify Account</h1>

          <p className="pt-3 pb-4 lead">An email with a verification code was sent to your email account. Please check your email for verification code</p>

          <form action="" className="mt-3" onSubmit={verify}>
            <input type="text" value={otp} className="form-control fw-semibold" placeholder="verification code" onChange={(e) => setOtp(e.target.value)} />

            <div className="text-end pt-4 pb-2">
              <button type="submit" className="btn btn-success btn-lg rounded-1">verify</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Otp;