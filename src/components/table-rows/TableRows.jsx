import { HashLink } from "react-router-hash-link";
import Swal from 'sweetalert2';

const TableRows = ({data, count, deleteBlog}) => {

  let blogDelete = (id) => {
    Swal.fire({
      icon: "question",
      text: 'Do you want to delete this blog ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor:"red"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(id)
      }
    })
  }

  return (
    <>
      <tr>
        <td>{count}</td>
        <td>
          <HashLink to={`/blog/${data._id}`} className="text-decoration-none text-dark fw-medium">
            {data.blogTitle}
          </HashLink>
        </td>
        <td>{data.category}</td>
        <td>
          <HashLink to={`/update-blog/${data._id}`} className="btn btn-success ms-2"><i className="fa-solid fa-pen-to-square"></i></HashLink>
          <button className="btn btn-danger ms-2 mt-2 mt-sm-0" onClick={() => blogDelete(data._id)} ><i className="fa-solid fa-trash-can"></i></button>
        </td>
        <td>{data.createdAt.substring(0, 10)}</td>
      </tr>
    </>
  );
};

export default TableRows;