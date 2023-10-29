import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCompanies } from '../store/actionCreator/companyActionCreator';
import { addJob, editJob, fetchJobById } from '../store/actionCreator/jobActionCreator';
import Loading from './Loading';
import Swal from 'sweetalert2';

export default function JobForm() {
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((state) => state.company);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addform, setAddForm] = useState({
    title: '',
    companyId: 0,
    description: '',
    jobType: '',
    salary: 0,
  });

  const [skills, setSkills] = useState([
    {
      name: '',
      level: '',
    },
  ]);

  const addMoreSkill = (event) => {
    event.preventDefault();
    setSkills([
      ...skills,
      {
        name: '',
        level: '',
      },
    ]);
  };

  const handleAddJob = (event) => {
    event.preventDefault();
    dispatch(addJob({ job: addform, skills: skills }))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, please check your input!',
        });
      });
  };

  const handleEditJob = (event) => {
    event.preventDefault();
    dispatch(editJob(addform, id))
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

  const handleChange = (event) => {
    setAddForm({
      ...addform,
      [event.target.name]: event.target.value,
    });
  };

  const handleSkillChange = (event) => {
    console.log(skills);
    let newSkills = skills.map((skill, i) => {
      if (event.target.id == i) {
        return {
          ...skill,
          [event.target.name]: event.target.value,
        };
      } else {
        return skill;
      }
    });
    setSkills(newSkills);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchJobById(id))
        .then((resData) => {
          setAddForm(resData);
          setSkills(resData.Skills);
        })
        .catch((error) => {
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

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container my-3 d-flex justify-content-center">
        <div className="row">
          <div className="text-center my-3">
            <h3 className="border-bottom pb-2">{id ? 'Edit Job Detail' : 'Add New Job'}</h3>
            <p className="text-muted">You can {id ? 'edit your' : 'add your new'} Job information by fill the field below</p>
          </div>
          <form onSubmit={id ? handleEditJob : handleAddJob}>
            <div className="mb-3">
              <label htmlFor="job-title" className="form-label">
                Job Title<span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" name="title" id="job-title" onChange={handleChange} value={addform.title} />
            </div>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Company<span className="text-danger">*</span>
              </label>
              <select className="form-control" name="companyId" id="company" onChange={handleChange} value={addform.companyId}>
                <option value={0} disabled>
                  --Select Company--
                </option>
                {companies.map((company) => {
                  return (
                    <option value={company.id} key={company.id}>
                      {company.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="job-description" className="form-label">
                Job Description<span className="text-danger">*</span>
              </label>
              <textarea type="text" className="form-control" id="job-description" name="description" onChange={handleChange} value={addform.description}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="job-type" className="form-label">
                Job Type<span className="text-danger">*</span>
              </label>
              <input type="text" name="jobType" className="form-control" id="job-type" onChange={handleChange} value={addform.jobType} />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Offered Salary<span className="text-danger">*</span>
              </label>
              <input type="number" min={0} name="salary" className="form-control" id="salary" onChange={handleChange} value={addform.salary} />
            </div>
            <div className="row">
              <span className="fw-bold col-6 pt-1">requirement skill</span>
              <div className="text-end col-6">
                {id == undefined && (
                  <a onClick={addMoreSkill} className="btn btn-sm bg-primary-subtle">
                    Add More Skill
                  </a>
                )}
              </div>
            </div>
            <hr />
            {/* {id == undefined && */}
            {skills.map((skill, index) => {
              return (
                <div className="row my-3" key={skill + index}>
                  <div className="col-6">
                    <label htmlFor="skill" className="form-label">
                      Skill<span className="text-danger">*</span>
                    </label>
                    {id && <input type="text" name="name" className="form-control" id={index} onChange={handleSkillChange} value={skills[index].name} disabled readOnly />}
                    {!id && <input type="text" name="name" className="form-control" id={index} onChange={handleSkillChange} value={skills[index].name} />}
                  </div>
                  <div className="col-6">
                    <label htmlFor="level" className="form-label">
                      Level<span className="text-danger">*</span>
                    </label>
                    {id && <input type="text" name="level" className="form-control" id={index} onChange={handleSkillChange} value={skills[index].level} disabled readOnly />}
                    {!id && <input type="text" name="level" className="form-control" id={index} onChange={handleSkillChange} value={skills[index].level} />}
                  </div>
                </div>
              );
            })}

            <div className="text-center mt-4">
              <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary col-5 me-3">
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
