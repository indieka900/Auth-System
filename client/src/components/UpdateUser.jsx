import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/UpdateUser.module.css';

function UpdateUser() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch current user data
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user'); // Adjust the endpoint as needed
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('Failed to load user data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    if (file) {
      formData.append('profilePicture', file);
    }
  
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await axios.put(`/api/update-user/${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile updated successfully!');
      setUser(response.data.user);
      // Clear the file input after successful upload
      setFile(null);
      // Reset the file input element
      if (e.target.profilePicture) {
        e.target.profilePicture.value = '';
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.updateUserContainer}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            maxLength={50}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            maxLength={50}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        {user.profilePicture && (
          <div className={styles.currentPicture}>
            <img src={user.profilePicture} alt="Current profile" />
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default UpdateUser;