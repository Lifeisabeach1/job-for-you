import React, { useState, useEffect, useRef } from 'react';



const Summary = () => {
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    fetch('http://localhost:8000/users/' + id, {
      method: 'DELETE'
    })
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
    })
    .catch(error => console.error('Error deleting user:', error));
  };


  return (
    <div className="page">
      <div className="container">
        
          <div className="pdf-container">
            {users.map((user) => (
              <div key={user.id} className="user-summary">
                {user.image && <img src={user.image} alt="User" />}
                <p>Namn: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Telefon: {user.telephone}</p>
                <p>Adress: {user.address}</p>
                <p>Ålder: {user.age}</p>
                <div className="contents-summary">
                  <h1>{ user.name }</h1>
                  <h3>Personligt brev</h3>
                  <p className="about-you">{user.content}</p>
                  
                </div>
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            ))}
          </div>
        
        
      </div>
    </div>
  );
};

export default Summary;


