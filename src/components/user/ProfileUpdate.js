import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from './ProfileUpdate.module.css'; // Import the CSS module
import UserContext from '../context/UserContext';
import { useAlert } from 'react-alert';
import Navbar from '../navbar/Navbar'

const ProfileUpdate = ({ profileId }) => {
    const {userId} = useContext(UserContext)
    const alert = useAlert()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });

  const [changedData, setChangedData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setChangedData({ ...changedData, [name]: value });
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3005/users/profile/${userId}`, changedData);
      console.log("Profile updated successfully")
      alert.success('Profile updated successfully');
      setChangedData({}); // Reset changedData after successful update
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <>
    <Navbar/>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          
          className={styles.textarea}
        ></textarea>
      </div>
      <button type="submit" className={styles.button}>Update Profile</button>
    </form>
    </>
  );
};

export default ProfileUpdate;
