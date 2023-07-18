import React, { useState } from 'react';
import { useRouter } from 'next/router';

function MyForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: ''
  });

  const styles = {
    input: {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    div: {
      borderRadius: '5px',
      backgroundColor: '#f2f2f2',
      padding: '20px',
    },
    submitHover: {
      backgroundColor: '#45a049',
    },
    submit: {
      width: '100%',
      backgroundColor: '#9933ff',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
   
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response.status);
      if (response.ok) {
        router.push('/');
      } else {
        // Handle API request error
        console.error('Form submission failed.');
      }
    } catch (error) {
      // Handle fetch error
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={styles.div} >
      <h1>Add New Records</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        style={styles.select}
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="age" >Age:</label>
      <input
        type="number"
        id="age"
        name="age"
        min="18" max="100"
        value={formData.age}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <button type="submit" style={styles.submit}>Submit</button>
    </form>
    </div>
  );
}

export default MyForm;
