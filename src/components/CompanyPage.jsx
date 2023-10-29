import { useState, useEffect } from 'react';
import CompanyRow from './CompanyRow';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../store/actionCreator/companyActionCreator';
import Loading from './Loading';

export default function CompanyPage() {
  const { companies } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCompanies()).finally(() => {
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
            <h1 className="display-5">Companies</h1>
          </div>
          <div className="col-6 text-end mt-3">
            <Link to={'/add-company'} className="btn btn-primary rounded-pill col-3">
              Add Company
            </Link>
          </div>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>No.</th>
              <th>Logo</th>
              <th>Company Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => {
              return <CompanyRow key={company.id} index={index} company={company} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
