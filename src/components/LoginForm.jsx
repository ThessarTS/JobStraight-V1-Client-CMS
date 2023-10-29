import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/actionCreator/userActionCreator';
import Swal from 'sweetalert2';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(loginForm))
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
      <div style={{ height: '100vh', alignContent: 'center', display: 'flex' }}>
        <div className="w-50 m-auto p-5 shadow rounded bg-primary-subtle">
          <h1 className="text-center display-4">Login</h1>
          <p className="mb-5 text-center text-secondary">please fill the field below to sign in your account</p>
          <form className="justify-content-center" onSubmit={handleLogin}>
            <div className="mb-5 w-50 mx-auto">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control shadow" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} value={loginForm.email} />
            </div>
            <div className="mb-5 w-50 mx-auto">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input type="password" className="form-control shadow" id="exampleInputPassword1" name="password" onChange={handleChange} value={loginForm.password} />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary rounded-4 col-4 mt-4 shadow">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
