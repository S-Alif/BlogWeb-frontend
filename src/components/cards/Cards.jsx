import { HashLink } from 'react-router-hash-link';

const Cards = ({data}) => {
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card-box shadow rounded-1 border border-1 mt-4">
          <div className="image">
            <img src={data.blogCoverImg} alt="" />
          </div>

          <div className="text p-4">
            <span className="badge bg-info rounded-pill mb-3">{data.category}</span>

            <h5 className="pb-3 fw-bold fs-5">{data.blogTitle}</h5>

            <p className="blog">{data.blogText}</p>
            
            <HashLink to={`/blog/${data._id.toString()}`} className='btn text-danger fw-medium ps-0 pb-0 fw-bold'>Read more...</HashLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;