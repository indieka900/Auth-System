import { useState } from "react";
import Axios from "axios";
//
import { baseUrl } from "../config";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/Login.module.css';

function Login() {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(`${baseUrl}/auth/login`, {
      email: formFields.email,
      password: formFields.password,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          navigate("/home");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={styles['login-container']}>
  <div className={styles['login-box']}>
    <h2 className={styles['login-header']}>Login</h2>
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <div className={styles['form-group']}>
        <label htmlFor="email" className={styles['form-label']}>Email:</label>
        <input
          type="email"
          id="email"
          className={styles['form-input']}
          value={formFields.email}
          onChange={(e) =>
            setFormFields((current) => ({
              ...current,
              email: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="password" className={styles['form-label']}>Password:</label>
        <input
          type="password"
          id="password"
          className={styles['form-input']}
          value={formFields.password}
          onChange={(e) =>
            setFormFields((current) => ({
              ...current,
              password: e.target.value,
            }))
          }
          required
        />
      </div>
      <button type="submit" disabled={loading} className={styles['submit-button']}>
        {loading ? <div className={styles['spinner']}></div> : "Login"}
      </button>
    </form>
    <p className={styles['signup-link']}>
      Don&apos;t have account? <Link to="/signup" className={styles['link']}>Sign Up</Link>
    </p>
  </div>
</div>
  );
}

export default Login;
