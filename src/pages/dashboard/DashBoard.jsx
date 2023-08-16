import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from './../../components/navigation/Navigation';
import './dashboard.css'
import TableRows from "../../components/table-rows/TableRows";
import Swal from 'sweetalert2';
import baseUrl from "../../components/Url";
import Footer from "../../components/footer/Footer";

const DashBoard = () => {

  let id = useParams()
  const [user, setUser] = useState([])
  const [blogs, setBlogs] = useState([])
  const [userUpdate, setUserUpdate] = useState({
    first_name: "",
    last_name: "",
    pfp: "",
  })
  const [load, setLoad] = useState(0)

  let headers ={
    headers:{
      token: sessionStorage.getItem('token')
    }
  }

  let deleteBlog = async (id) => {
    console.log(headers)
    await axios.get(`${baseUrl}/delete-blog/${id}`, headers)
      .then(res => {
        if(res.data['status'] == 1){
          Swal.fire({
            icon:'success',
            text: 'blog deleted'
          })

          setLoad(1)
        }
        else{
          Swal.fire({
            icon: 'error',
            text: 'blog deletion failed'
          })
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    (async () => {
      await axios.get(`${baseUrl}/dashboard/${id.id}`, headers)
        .then(res => {
          setUser(res.data['user'])
          setBlogs(res.data['blogs'])
          setLoad(0)
        })
        .catch(err => {
          console.log(err)
        })
    })()
  }, [load])

  let dataHandler = (property, value) => {
    setUserUpdate({ ...userUpdate, [property]: value })
  }

  let updateUser = async (e) => {
    e.preventDefault()
    let data = {
      first_name: userUpdate.first_name == "" ? user.first_name : userUpdate.first_name,
      last_name: userUpdate.last_name == "" ? user.last_name : userUpdate.last_name,
      pfp: userUpdate.pfp == "" ? user.pfp : userUpdate.pfp,
    }

    await axios.post(baseUrl+'/user-update/'+user._id, data, headers)
      .then(res => {
        console.log(res)
        if (res.data['status'] == 1) {
          Swal.fire({
            icon: 'success',
            text: 'profile updated'
          })

          setLoad(1)
        }
        else {
          Swal.fire({
            icon: 'error',
            text: 'profile update failed'
          })
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
    <Navigation />

      <section className="dashboard py-5">
        <div className="container">
          <h1 className="fs-1 fw-bold pb-3 border-bottom border-2">Dashboard</h1>
          <div className="user-details pt-4">
            <div className="row">
              <div className="col-lg-4">
                <div className="image">
                  <img src={user.pfp} alt="user image" />
                </div>
              </div>

              <div className="col-lg-8">
                <h5 className="fw-bold pb-3 border-bottom border-2">Your details</h5>

                <form action="" className="mt-5" onSubmit={updateUser}>
                  <div className="row">
                    <div className="col-sm-6 mt-3">
                      <input type="text" value={userUpdate.first_name} className="form-control" placeholder={user.first_name} onChange={(e) => dataHandler("first_name", e.target.value)}/>
                    </div>
                    <div className="col-sm-6 mt-3">
                      <input type="text" value={userUpdate.last_name} className="form-control" placeholder={user.last_name} onChange={(e) => dataHandler("last_name", e.target.value)}/>
                    </div>
                    <div className="col-12 mt-3">
                      <input type="text" value={userUpdate.pfp} className="form-control" placeholder={user.pfp} onChange={(e) => dataHandler("pfp", e.target.value)} />
                    </div>

                    <div className="ipdate-btn pt-4">
                      <button className="btn btn-success rounded-1">update</button>
                      <button className="btn btn-primary rounded-1 ms-2">forgot password</button>
                    </div>
                  </div>
                </form>

                <p className="pt-4 fw-semibold fs-4">Total comments : <span className="fw-medium">{user.totalCommentCount}</span></p>
              </div>
            </div>
          </div>

          {
            blogs.length > 0 && <div className="blog-table pt-5 my-4">
              <h5 className="fw-bold pb-3 border-bottom border-2 mb-4">Your written blogs</h5>
              <table className="table table-striped table-responsive table-bordered w-100">
                <thead>
                  <tr className="table-dark">
                    <th>Count</th>
                    <th>Blog title</th>
                    <th>Category</th>
                    <th>Actions</th>
                    <th>Created at</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    blogs.map((e, index) => (
                      <TableRows data={e} count={index + 1} key={index} deleteBlog={deleteBlog} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          }


        </div>
      </section>
      <Footer />
    </>
  );
};

export default DashBoard;