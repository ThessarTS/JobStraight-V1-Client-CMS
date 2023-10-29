import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCompany, editCompany, fetchCompanyById } from '../store/actionCreator/companyActionCreator';
import Loading from './Loading';
import Swal from 'sweetalert2';

export default function CompanyForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addform, setAddForm] = useState({
    name: '',
    companyLogo: '',
    description: '',
    location: '',
    email: '',
  });

  const handleAddCompany = (event) => {
    event.preventDefault();
    dispatch(addCompany(addform))
      .then(() => {
        navigate('/companies');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, please check your input!',
        });
      });
  };

  const handleEditCompany = (event) => {
    event.preventDefault();
    dispatch(editCompany(addform, id))
      .then(() => {
        navigate('/companies');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, please check your input!',
        });
      });
  };

  const handleChange = (event) => {
    setAddForm({
      ...addform,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchCompanyById(id))
        .then((resData) => {
          setAddForm(resData);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong, please check your input!',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container my-3 d-flex justify-content-center">
        <div className="row">
          <div className="text-center my-3">
            <h3 className="border-bottom pb-2">{id ? 'Edit' : 'Add New'} Company</h3>
            <p className="text-muted">You can {id ? 'edit the' : 'add the'} Company information by fill the field below</p>
          </div>
          <form onSubmit={id ? handleEditCompany : handleAddCompany}>
            <div className="mb-3">
              <label htmlFor="company-name" className="form-label">
                Company Name<span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" name="name" id="company-name" onChange={handleChange} value={addform.name} required />
            </div>
            <div className="mb-3">
              <label htmlFor="company-email" className="form-label">
                Company Email<span className="text-danger">*</span>
              </label>
              <input type="email" name="email" className="form-control" id="company-email" onChange={handleChange} value={addform.email} required />
            </div>
            <div className="mb-3">
              <label htmlFor="company-location" className="form-label">
                Location<span className="text-danger">*</span>
              </label>
              <input type="text" name="location" className="form-control" id="company-location" onChange={handleChange} value={addform.location} required />
            </div>
            <div className="mb-3">
              <label htmlFor="company-description" className="form-label">
                Description<span className="text-danger">*</span>
              </label>
              <textarea type="text" className="form-control" id="company-description" name="description" required onChange={handleChange} value={addform.description}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="company-logo" className="form-label">
                Logo Url<span className="text-danger">*</span>
              </label>
              <input type="text" name="companyLogo" className="form-control" id="company-logo" onChange={handleChange} value={addform.companyLogo} required />
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className="btn btn-secondary col-5 me-3">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary col-5 ms-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
