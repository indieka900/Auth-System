import { useState } from "react";
import Axios from "axios";
import "../App.css";
import { baseUrl } from "../config";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`${formFields.username}, ${formFields.email}`);
    Axios.post(`${baseUrl}/auth/signup`, {
      username: formFields.username,
      email: formFields.email,
      password: formFields.password,
    }).then(res => {
        if(res.data.status === 201){
          navigate('/login');
        }
    }).catch(err => {
        console.log(err);
    })
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form action="" className="sign-up-form" onSubmit={handleSubmit}>
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

        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
