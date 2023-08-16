import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './blog-page.css'
import Swal from "sweetalert2";
import Comment from "../../components/comment/Comment";
import Navigation from "../../components/navigation/Navigation";
import baseUrl from "../../components/Url";
import Footer from "../../components/footer/Footer";
import { HashLink } from "react-router-hash-link";

const BlogPage = () => {

  const id = useParams()
  const [data, setData] = useState([])
  const [author, setAuthor] = useState([])
  const [comments, setComments] = useState("")
  const [allComment, setAllComment] = useState([])
  const [load, setload] = useState(0)


  let headers = {
    headers: {
      token: sessionStorage.getItem('token')
    }
  }

    // get all comments
    let getAllComments = async () => {
      await axios.get(baseUrl+'/all-comments/'+id.id)
        .then(res => {
          if (res.data['status'] == 1) {
            setAllComment(res.data['data'])
          }
          else{
            Swal.fire({
              icon: 'error',
              text: "could not retrive comments"
            })
          }
        })
        .catch(err => console.log(err))
    }

  useEffect(() => {
    (async () => {
      await axios.get(`${baseUrl}/blogID/${id.id}`)
        .then(res => {
          setData(res.data['data'])
          setAuthor(res.data['user'])
          setload(0)
        })
        .catch(err => console.log(err))

      await getAllComments()
    })()
  }, [load])

    // get a single user
    let getUser = async (id) => {
      let response = await axios.get(baseUrl+'/user/'+id, headers)
      return response.data['data']
    }

    // pass the comment
    let supplyComment = async (e) => {
      e.preventDefault()

      let userData = await getUser(sessionStorage.getItem('user'))

      let payload = {
        commentText: comments,
        commentedOnPost: id.id,
        postTitle: data['blogTitle'],
        commentAuthor:{
          id: sessionStorage.getItem('user'),
          first_name: ""+userData.first_name,
          last_name: ""+userData.last_name,
          pfp: ""+userData.pfp
        }
      }

      await axios.post(baseUrl+'/comment', payload, headers)
        .then(res => {
          if(res.data['status'] == 1){
            Swal.fire({
              icon:'success',
              text: "comment posted"
            })
            setComments("")
            setload(1)
            return
          }
          else{
            Swal.fire({
              icon: 'error',
              text: "comment could not be posted"
            })

            return
          }
        }).catch(err => {
          console.log(err)
        })

    }




  return (
    <>
      <Navigation />
      <section className="blog-page py-5">
        <div className="container">
          <HashLink to={'/'} className="btn btn-dark mb-4">go back</HashLink>

          <div className="blog-image rounded-2 shadow-lg mt-4">
            <img src={data['blogCoverImg']} alt="" />
          </div>

          <span className="badge bg-info rounded-pill mt-5 mb-3 fs-6">{data.category}</span>
          <h1 className="text-black pb-5 fw-bold">{data['blogTitle']}</h1>

          <p className="">{data['blogText']}</p>

          <div className="user-box mt-5 pt-5">
            <div className="card mb-3 mt-5" style={{ maxWidth: 300 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <div className="image">
                    <img src={author['pfp']} className="rounded-start" alt="..." />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-3">
                    <h5 className="card-title fs-6">Author</h5>
                    <p className="card-text fw-bold fs-5">
                      {author.first_name} {author.last_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>


          <div className="comment-section pt-5">
            <h4 className="fs-4 border-bottom border-2 pb-3 fw-bold">Comments</h4>

            <div className="comment-form mt-5">
              {
                headers.headers.token ? <form action="" onSubmit={supplyComment}>
                  <textarea type="text" rows={3} className="form-control" value={comments} onChange={(e) => setComments(e.target.value)} placeholder="write a comment" required minLength={10} />
                  <div className="text-end pt-3">
                    <button className="btn btn-success">submit</button>
                  </div>
                </form> : <p className="lead text-center">Please log in to comment</p>
              }
            </div>

            <h3 className="fs-5 border-bottom border-2 pb-3">All comments ({data.commentCount})</h3>
            <div className="row mt-4">
              {
                allComment.length > 0 &&
                  allComment.map((e, index) => (
                    <Comment comment={e} key={index} />
                  ))
              }
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;