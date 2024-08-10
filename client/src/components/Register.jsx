import { useState } from "react";
import Axios from "axios";
import { baseUrl } from "../config";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css"; // Import the CSS module

function Register() {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Axios.post(`${baseUrl}/auth/signup`, {
      username: formFields.username,
      email: formFields.email,
      password: formFields.password,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={styles["sign-up-container"]}>
      <h2>Sign Up</h2>
      <form className={styles["sign-up-form"]} onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          placeholder="username"
          onChange={(e) =>
            setFormFields((current) => ({
              ...current,
              username: e.target.value,
            }))
          }
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) =>
            setFormFields((current) => ({
              ...current,
              email: e.target.value,
            }))
          }
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) =>
            setFormFields((current) => ({
              ...current,
              password: e.target.value,
            }))
          }
        />

        <button
          type="submit"
          disabled={loading}
          className={styles["submit-button"]}
        >
          {loading ? <div className={styles["spinner"]}></div> : "Login"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
