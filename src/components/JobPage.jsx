import { useEffect, useState } from 'react';
import JobRow from './JobRow';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/actionCreator/jobActionCreator';
import Loading from './Loading';

export default function JobPage() {
  const { jobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchJobs()).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <h1 className="display-5">Jobs</h1>
          </div>
          <div className="col-6 text-end mt-3">
            <Link to={'/add-job'} className="btn btn-primary rounded-pill col-3">
              Add Job
            </Link>
          </div>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>No.</th>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>Job Type</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 &&
              jobs.map((job, index) => {
                console.log(job);
                return <JobRow key={job.id} index={index} job={job} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
