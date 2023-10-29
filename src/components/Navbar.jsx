import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4">CMS JobStraight</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/'} className="btn btn-hover">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/companies'} className="btn btn-hover">
                  Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/register'} className="btn btn-hover">
                  Register Admin
                </Link>
              </li>
            </ul>
          </div>
          <a onClick={logout} className="btn btn-outline-secondary">
            Logout
          </a>
        </div>
      </nav>
    </>
  );
}
