import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteJob } from '../store/actionCreator/jobActionCreator';

export default function JobRow({ job, index }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteJob(job.id));
  };
  return (
    <>
      <tr className="align-middle">
        <th>{index + 1}</th>
        <td>{job.title}</td>
        <td>{job.Company.name}</td>
        <td>{job.jobType}</td>
        <td>{job.User.username}</td>
        <td>{job.createdAt}</td>
        <td className="row">
          <Link to={`/job/${job.id}`} className="btn btn-sm btn-primary col-4 me-1">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-sm btn-danger col-4 ms-1">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
