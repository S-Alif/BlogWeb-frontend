

const Comment = ({comment}) => {

  return (
    <>
      <div className="col-12">
        <div className="comment-boxes border-bottom border-2 p-3">

          <div className="image">
            <img src={comment.commentAuthor.pfp} alt="" />
          </div>

          <div className="text ps-3">
            <h5 className="fw-bold fs-6 pb-1">{comment.commentAuthor.first_name} {comment.commentAuthor.last_name}</h5>

            <p className="mb-0">{comment.commentText}</p>
          </div>
        </div>
      </div> 
    </>
  );
};

export default Comment;