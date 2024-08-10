import { useState } from "react";
import Axios from "axios";
import "../App.css";
import { baseUrl } from "../config";


function Register() {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`${formFields.username}, ${formFields.email}`);
    Axios.post(`${baseUrl}/auth/signup`, {
      username: formFields.username,
      email: formFields.email,
      password: formFields.password,
    }).then(res => {
        console.log(res);
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
          value={formFields.username}
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
      </form>
    </div>
  );
}

export default Register;
