import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cvt = () => {
  const [users, setUsers] = useState([]);
  const [jobContainers, setJobContainers] = useState([
    { id: Date.now(), work: '', title: '', date: '', dates: '', description: '' }
  ]);
  const [educationContainers, setEducationContainers] = useState([
    { id: Date.now() + 1, institution: '', degree: '', fromDate: '', toDate: '', description: '' }
  ]);
  const [referenceContainers, setReferenceContainers] = useState([
    { id: Date.now() + 2, company: '', occupation: '', person: '', contactinformation: '', description: '' }
  ]);
  const [languageContainers, setLanguageContainers] = useState([
    { id: Date.now() + 3, language: '', level: '' }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing users (if needed)
    fetch("http://localhost:8000/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Job Containers
  const addJobContainer = () => {
    setJobContainers([
      ...jobContainers,
      { id: Date.now(), work: '', title: '', date: '', dates: '', description: '' }
    ]);
  };

  const handleJobInputChange = (id, field, value) => {
    setJobContainers(jobContainers.map(container =>
      container.id === id ? { ...container, [field]: value } : container
    ));
  };

  const removeJobContainer = (id) => {
    setJobContainers(jobContainers.filter(container => container.id !== id));
  };

  // Education Containers
  const addEducationContainer = () => {
    setEducationContainers([
      ...educationContainers,
      { id: Date.now() + 1, institution: '', degree: '', fromDate: '', toDate: '', description: '' }
    ]);
  };

  const handleEducationInputChange = (id, field, value) => {
    setEducationContainers(educationContainers.map(container =>
      container.id === id ? { ...container, [field]: value } : container
    ));
  };

  const removeEducationContainer = (id) => {
    setEducationContainers(educationContainers.filter(container => container.id !== id));
  };

  // Reference Containers
  const addReferenceContainer = () => {
    setReferenceContainers([
      ...referenceContainers,
      { id: Date.now() + 2, company: '', occupation: '', person: '', contactInformation: '', description: '' }
    ]);
  };

  const handleReferenceInputChange = (id, field, value) => {
    setReferenceContainers(referenceContainers.map(container =>
      container.id === id ? { ...container, [field]: value } : container
    ));
  };

  const removeReferenceContainer = (id) => {
    setReferenceContainers(referenceContainers.filter(container => container.id !== id));
  };

  // Language Containers
  const addLanguageContainer = () => {
    setLanguageContainers([
      ...languageContainers,
      { id: Date.now() + 3, language: '', level: '' }
    ]);
  };

  const handleLanguageInputChange = (id, field, value) => {
    setLanguageContainers(languageContainers.map(container =>
      container.id === id ? { ...container, [field]: value } : container
    ));
  };

  const removeLanguageContainer = (id) => {
    setLanguageContainers(languageContainers.filter(container => container.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      jobs: jobContainers,
      education: educationContainers,
      references: referenceContainers,
      languages: languageContainers,
    };

    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        // Navigate to the summary page
        navigate('/cvsummary', {
          state: {
            jobContainers: jobContainers,
            educationContainers: educationContainers,
            referenceContainers: referenceContainers,
            languageContainers: languageContainers,
            preview: '', // or any other preview data you might want to pass
          },
        });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <form className="form-submit" onSubmit={handleSubmit}>
      <h2 className='work-places'>Arbetslivserfarenhet</h2>
      {jobContainers.map((container) => (
        <div key={container.id} className="container-cv">
          <div className="work-title-wrapper">
            <textarea
              className={`styled-textarea work-${container.id}`}
              placeholder="Företag"
              value={container.work}
              onChange={(e) => handleJobInputChange(container.id, 'work', e.target.value)}
              required
            />
            <textarea
              className={`styled-textarea title-${container.id}`}
              placeholder="Titel"
              value={container.title}
              onChange={(e) => handleJobInputChange(container.id, 'title', e.target.value)}
              required
            />
          </div>
          <div className="date-wrapper">
            <textarea
              className={`styled-textarea from-date-${container.id}`}
              placeholder="Från Datum"
              value={container.date}
              onChange={(e) => handleJobInputChange(container.id, 'date', e.target.value)}
              required
            />
            <textarea
              className={`styled-textarea to-date-${container.id}`}
              placeholder="Till Datum"
              value={container.dates}
              onChange={(e) => handleJobInputChange(container.id, 'dates', e.target.value)}
              required
            />
          </div>
          <textarea
            className={`styled-textareas description-${container.id}`}
            placeholder="Beskrivning"
            value={container.description}
            onChange={(e) => handleJobInputChange(container.id, 'description', e.target.value)}
            required
          />
          <button type="button" className="remove-job-container" onClick={() => removeJobContainer(container.id)}>Radera jobb</button>
          <button type="button" className='add-job-container' onClick={addJobContainer}>Lägg till jobb</button>
        </div>
      ))}

      <h2 className='education-section'>Utbildning</h2>
      {educationContainers.map((container) => (
        <div key={container.id} className="container-cv">
          <div className="work-title-wrapper">
            <textarea
              className={`styled-textarea institution-${container.id}`}
              placeholder="Utbildningsinstitut"
              value={container.institution}
              onChange={(e) => handleEducationInputChange(container.id, 'institution', e.target.value)}
              required
            />
            <textarea
              className={`styled-textarea degree-${container.id}`}
              placeholder="Examen"
              value={container.degree}
              onChange={(e) => handleEducationInputChange(container.id, 'degree', e.target.value)}
              required
            />
          </div>
          <div className="date-wrapper">
            <textarea
              className={`styled-textarea from-date-${container.id}`}
              placeholder="Från Datum"
              value={container.fromDate}
              onChange={(e) => handleEducationInputChange(container.id, 'fromDate', e.target.value)}
              required
            />
            <textarea
              className={`styled-textarea to-date-${container.id}`}
              placeholder="Till Datum"
              value={container.toDate}
              onChange={(e) => handleEducationInputChange(container.id, 'toDate', e.target.value)}
              required
            />
          </div>
          <textarea
            className={`styled-textareas description-${container.id}`}
            placeholder="Beskrivning"
            value={container.description}
            onChange={(e) => handleEducationInputChange(container.id, 'description', e.target.value)}
            required
          />
          <button type="button" className="remove-education-container" onClick={() => removeEducationContainer(container.id)}>Radera utbildning</button>
          <button type="button" className='add-education-container' onClick={addEducationContainer}>Lägg till utbildning</button>
        </div>
      ))}

      <h2 className='languages'>Språk</h2>
      {languageContainers.map((container) => (
        <div key={container.id} className="container-cv">
          <div className="language-level-wrapper">
            <textarea
              className={`styled-textarea language-${container.id}`}
              placeholder="Språk"
              value={container.language}
              onChange={(e) => handleLanguageInputChange(container.id, 'language', e.target.value)}
              required
            />
            <textarea
              className={`styled-textarea level-${container.id}`}
              placeholder="Nivå (t.ex. Grundläggande, Flytande, Modersmål)"
              value={container.level}
              onChange={(e) => handleLanguageInputChange(container.id, 'level', e.target.value)}
              required
            />
          </div>
          <button type="button" className="remove-language-container" onClick={() => removeLanguageContainer(container.id)}>Radera språk</button>
          <button type="button" className='add-language-container' onClick={addLanguageContainer}>Lägg till språk</button>
        </div>
      ))}

      <h2 className='references'>Referenser</h2>
      {referenceContainers.map((container) => (
        <div key={container.id} className="container-cv">
          <div className="work-title-wrapper">
            <textarea
              className={`styled-textarea company-${container.id}`}
              placeholder="Företag"
              value={container.company}
              onChange={(e) => handleReferenceInputChange(container.id, 'company', e.target.value)}
              required
            />
            <textarea
              className={`styled-textarea occupation-${container.id}`}
              placeholder="Titel"
              value={container.occupation}
              onChange={(e) => handleReferenceInputChange(container.id, 'occupation', e.target.value)}
              required
            />
          </div>
          <div className="date-wrapper">
            <textarea
              className={`styled-textarea person-${container.id}`}
              placeholder="Namn person"
              value={container.person}
              onChange={(e) => handleReferenceInputChange(container.id, 'person', e.target.value)}
              required
            />
            <textarea
              className={`styled-textarea contactInformation-${container.id}`}
              placeholder="Kontakt information telefon"
              value={container.contactInformation}
              onChange={(e) => handleReferenceInputChange(container.id, 'contactInformation', e.target.value)}
              required
            />
          </div>
          <textarea
            className={`styled-textareas description-${container.id}`}
            placeholder="Beskrivning"
            value={container.description}
            onChange={(e) => handleReferenceInputChange(container.id, 'description', e.target.value)}
            required
          />
          <button type="button" className="remove-reference-container" onClick={() => removeReferenceContainer(container.id)}>Radera referens</button>
          <button type="button" className='add-reference-container' onClick={addReferenceContainer}>Lägg till referens</button>
        </div>
      ))}

      <button type="submit" className="custom-file-upload2">Skicka in</button>
    </form>
  );
};

export default Cvt;