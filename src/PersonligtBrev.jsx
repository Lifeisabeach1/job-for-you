import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    
    fetch("http://localhost:8000/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      telephone,
      address,
      age,
      image,
      content,
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
      setUsers([...users, data]);
      navigate('/summary', {
        state: newUser,
      });
    })
    .catch(error => console.error('Error adding user:', error));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

 

 

  return (
    <div className="containers">
      <div className="home">
        <label htmlFor="image" className="custom-file-upload">
          Välj bild
        </label>
      </div>
      <div className="personal-information">
        <form onSubmit={handleSubmit}>
          <div className="name"> 
            <label htmlFor="name"></label>
            <input
              placeholder="Namn"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="email">
            <label htmlFor="email"></label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="telephone">
            <label htmlFor="telephone"></label>
            <input
              placeholder="Telefon"
              type="tel"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div className="address">
            <label htmlFor="address"></label>
            <input
              placeholder="Adress"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="age">
            <label htmlFor="age"></label>
            <input
              placeholder="Ålder"
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="image-upload">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

            {preview && (
              <div className="image-preview">
                <p>Förhandsgranskning:</p>
                <img src={preview} alt="Preview" style={{ maxWidth: '100px' }} />
              </div>
            )}
          </div>
          <button className="custom-file-upload" type="submit">
            Submit        
          </button>
        </form>
      </div>

      <div className="contents">
        <label htmlFor="content"></label>
        <textarea
          placeholder="Write your text here"
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        /> 
      </div>
      
     
    </div>
  );
};

export default Home;