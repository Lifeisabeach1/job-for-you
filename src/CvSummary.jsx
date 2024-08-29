
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CvSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [jobContainers, setJobContainers] = useState(location.state?.jobContainers || []);
  const [educationContainers, setEducationContainers] = useState(location.state?.educationContainers || []);
  const [referenceContainers, setReferenceContainers] = useState(location.state?.referenceContainers || []);
  const [languageContainers, setLanguageContainers] = useState(location.state?.languageContainers || []);
  const [preview, setPreview] = useState(location.state?.preview || '');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== id));
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const editUser = (id) => {
    const user = users.find(user => user.id === id);
    if (user) {
      setJobContainers(user.jobs);
      setEducationContainers(user.education);
      setReferenceContainers(user.references);
      setLanguageContainers(user.languages);
      setPreview(user.preview);

      navigate('/cvt', {
        state: {
          jobContainers: user.jobs,
          educationContainers: user.education,
          referenceContainers: user.references,
          languageContainers: user.languages,
          preview: user.preview
        }
      });
    }
  };

  return (
    <div className="summary-container">
      <div className="job-summary">
        <h3>Arbetslivserfarenhet</h3>
        {jobContainers.map((job, index) => (
          <div className="works" key={index} id={`job-${index}`}>
            <div className="job-header">
              <h4 className="job-work" id={`job-work-${index}`}>{job.work}</h4>
              <p className="job-title" id={`job-title-${index}`}>{job.title}</p>
            </div>
            <p className="job-date" id={`job-date-${index}`}>{job.date} - {job.dates}</p>
            <p className="job-description" id={`job-description-${index}`}>{job.description}</p>
          </div>
        ))}
      </div>

      <div className="education-summary">
        <h3>Utbildning</h3>
        {educationContainers.map((education, index) => (
          <div className="educations" key={index} id={`education-${index}`}>
            <div className="education-header">
              <h4 className="education-institution" id={`education-institution-${index}`}>{education.institution}</h4>
              <p className="education-degree" id={`education-degree-${index}`}>{education.degree}</p>
            </div>
            <p className="education-from-date" id={`education-fromDate-${index}`}>{education.fromDate} - {education.toDate}</p>
            <p className="education-description" id={`education-description-${index}`}>{education.description}</p>
          </div>
        ))}
      </div>

      <div className="language-summary">
        <h3>Språk</h3>
        {languageContainers.map((language, index) => (
          <div className="language" key={index} id={`language-${index}`}>
            <div className="language-header">
              <p className="language-language" id={`language-language-${index}`}><strong>{language.language}</strong></p>
              <p className="language-level" id={`language-level-${index}`}>{language.level}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="reference-summary">
        <h3>Referenser</h3>
        {referenceContainers.map((reference, index) => (
          <div className="reference" key={index} id={`reference-${index}`}>
                <h4 className="reference-company" id={`reference-company-${index}`}>{reference.company}</h4>
                <p className="reference-occupation" id={`reference-occupation-${index}`}>{reference.occupation}</p>
              <div className='reference-header'>
                <p className="reference-person" id={`reference-person-${index}`}>{reference.person}</p>
                <p className="reference-contactinformation" id={`reference-contactinformation-${index}`}>{reference.contactInformation}</p>
              </div>
                <p className="reference-description" id={`reference-description-${index}`}>{reference.description}</p>
            
          </div>
        ))}
      </div>

      <div className="preview-summary">
        <p>{preview}</p>
      </div>

      <div className="users-container">
        {users.map(user => (
          <div key={user.id}>
            <p>{user.preview}</p>
            <button onClick={() => editUser(user.id)}>Redigera</button>
            <button onClick={() => deleteUser(user.id)}>Ta bort</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CvSummary;