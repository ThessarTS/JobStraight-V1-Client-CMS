import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerNewAdmin } from '../store/actionCreator/userActionCreator';
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({
    email: '',
    password: '',
    username: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (event) => {
    setRegistForm({
      ...registForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(registerNewAdmin(registForm))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, please check your input!',
        });
      });
  };

  return (
    <>
      <div className="w-50 mx-auto mt-3 p-5 shadow rounded-4">
        <h3 className="mb-5 pb-3 text-center display-5">Register New Admin</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control rounded-4" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} value={registForm.email} />
          </div>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control rounded-4" id="exampleInputPassword1" name="password" onChange={handleChange} value={registForm.password} />
          </div>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control rounded-4" id="username" name="username" onChange={handleChange} value={registForm.username} />
          </div>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea type="text" className="form-control rounded-4" id="address" name="address" onChange={handleChange} value={registForm.address}></textarea>
          </div>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input type="number" className="form-control rounded-4" id="phoneNumber" name="phoneNumber" onChange={handleChange} value={registForm.phoneNumber} />
          </div>
          <div className="text-center mt-5">
            <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary col-4 me-4 rounded-4">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary col-4 ms-5 rounded-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
