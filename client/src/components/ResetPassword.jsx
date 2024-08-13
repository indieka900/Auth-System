/* eslint-disable no-unused-vars */
import styles from "../styles/Login.module.css";
import { useState } from "react";
import Axios from "axios";
import { baseUrl } from "../config";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const {token} = useParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(`${baseUrl}/auth/reset-password/` + token, {
      password,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
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
        <h2 className={styles["login-header"]}>Reset Password</h2>
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["form-label"]}>
              New Password:
            </label>
            <input
              type="password"
              id="password"
              className={styles["form-input"]}
              value={password}
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles["submit-button"]}
          >
            {loading ? <div className={styles["spinner"]}></div> : "Reset"}
          </button>
        </form>
        <p className={styles["signup-link"]}>
          {/* <Link to="/forgot-password">Forgot Password?</Link> <br />
          Don&apos;t have account?{" "}
          <Link to="/signup" className={styles["link"]}>
            Sign Up
          </Link> */}
        </p>
      </div>
    </div>
  );
}
