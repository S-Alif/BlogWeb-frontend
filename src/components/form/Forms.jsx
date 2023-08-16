import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navigation from "../navigation/Navigation";
import baseUrl from "../Url";

const Forms = () => {

  const navigate = useNavigate()
  const id = useParams()

  const [data, setData] = useState({
    blogTitle: "",
    blogText: "",
    blogCoverImg: "https://placehold.co/1920x1080?font=roboto",
    category: "",
    author: sessionStorage.getItem('user')
  })

  let dataHandler = (property, value) => {
    setData({ ...data, [property]: value })
  }

  useEffect(() => {
    if(id.id){
      (async () => {
        await axios.get(`${baseUrl}/blogID/${id.id}`)
          .then(res => {
            console.log(res.data['data'])
            setData({
              blogTitle: res.data['data']['blogTitle'],
              blogText: res.data['data']['blogText'],
              blogCoverImg: res.data['data']['blogCoverImg'],
              category: res.data['data']['category'],
              author: sessionStorage.getItem('user')
            })
          })
      })()
    }
  }, [])
  
  // throw alert
  let throwAlert = (propertyName, msg) => {
    Swal.fire({
      icon: "info",
      text: propertyName+" "+msg
    })
  }

  // validation
  let validate = (e) => {
    e.preventDefault()

    if(data.category == ""){
      throwAlert("categoty", "must be selected")
    }
    else if (data.blogTitle.trim().length < 10){
      throwAlert("blogTitle", "cannot be less than 10 character")
    }
    else if (data.blogText.trim().length < 250){
      throwAlert("blogText", "cannot be less than 250 character")
    }
    else{
      blogRUD()
    }
  }

  
  // create blog
  let blogRUD = async () => {

    let url = baseUrl+"/createBlog"

    if(id.id){
      url = baseUrl+"/updateBlog/"+id.id
    }

    await axios.post(url, data, {
      headers: {
        token: sessionStorage.getItem('token')
      } })
      .then(res => {
        if(res.data['status'] == 1){

          Swal.fire({
            icon:"success",
            text: "changes saved"
          })

          setData({
            blogTitle: "",
            blogText: "",
            blogCoverImg: "https://placehold.co/1920x1080?font=roboto",
            category: "",
            author: sessionStorage.getItem('user')
          })

          setTimeout(() => {
            if (id.id) {
              navigate('/blog/' + id.id)
            }
          }, 3000)
        }
        else{
          throwAlert("changes", "failed")
        }
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: err.response.data['code'] + " " + err.response.data['data'],
          text: "please log in again"
        })
      })
  }





  return (
    <>
      <Navigation />
      <section className="forms py-5 mt-4">
        <div className="container">
          <h1 className="fs-1 fw-bold pb-3 border-bottom border-2">{id.id ? "Update" : "Create"} your blog</h1>

          <div className="form-contents pt-5">
            <div className="row justify-content-center">
              
              <div className="col-md-8">
                <div className="form-box">
                  <form action="" onSubmit={validate} noValidate>

                    <div className="input-group mb-3">
                      <span className="input-group-text bg-info-subtle fw-bold">Category</span>
                      <select value={data.category} className=" form-select" onChange={(e) => dataHandler("category", e.target.value)} required>
                        <option value="">Select category</option>
                        <option value="science">Science</option>
                        <option value="tech">Tech</option>
                        <option value="web development">Web development</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="blog-title" className="mb-2 fw-bold">Blog title</label>
                      <input type="text" className="form-control fw-medium mb-4 border border-2 border-dark" value={data.blogTitle} placeholder="Blog title" id="blog-title" onChange={(e) => dataHandler('blogTitle', e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="blog-text" className="mb-2 fw-bold">Blog description</label>
                      <textarea type="text" rows={10} id="blog-text" className="form-control fw-medium border border-2 border-dark mb-4" value={data.blogText} placeholder="Blog description" onChange={(e) => dataHandler('blogText', e.target.value)} required />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text bg-info-subtle fw-bold">Cover Image link</span>
                      <input type="text" className="form-control fw-medium border border-2 border-dark" value={data.blogCoverImg} placeholder="Blog title" id="blog-title" onChange={(e) => dataHandler('blogCoverImg', e.target.value)} />
                    </div>

                    <button className="btn btn-success w-100 rounded-1">{id.id ? "Update" :"Submit"}</button>
                    
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forms;