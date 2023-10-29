import { useDispatch } from 'react-redux';
import { deleteCompany } from '../store/actionCreator/companyActionCreator';
import { Link } from 'react-router-dom';

export default function CompanyRow({ company, index }) {
  const dispatch = useDispatch();

  const handleDeleteCompany = () => {
    dispatch(deleteCompany(company.id));
  };

  return (
    <>
      <tr className="align-middle">
        <th>{index + 1}</th>
        <td>
          <img src={company.companyLogo} alt="logo" className="rounded-circle" style={({ height: '50px' }, { width: '50px' })} />
        </td>
        <td>{company.name}</td>
        <td>{company.location}</td>
        <td>{company.email}</td>
        <td className="col-4">{company.description}</td>
        <td className="">
          <Link to={`/company/${company.id}`} className="btn btn-sm btn-primary col-5 me-1">
            Edit
          </Link>
          <button onClick={handleDeleteCompany} className="btn btn-sm btn-danger col-6 ms-1">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
