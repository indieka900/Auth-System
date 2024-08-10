import styles from "../styles/Login.module.css";
import { useState } from "react";
import Axios from "axios";
import { baseUrl } from "../config";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(`${baseUrl}/auth/forgot-password`, {
      email,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          alert("Check your email");
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <h2 className={styles["login-header"]}>Forgot Password</h2>
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["form-label"]}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              className={styles["form-input"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles["submit-button"]}
          >
            {loading ? <div className={styles["spinner"]}></div> : "Submit"}
          </button>
        </form>
        <p className={styles["signup-link"]}>
          <Link to="/forgot-password">Forgot Password?</Link> <br />
          Don&apos;t have account?{" "}
          <Link to="/signup" className={styles["link"]}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
