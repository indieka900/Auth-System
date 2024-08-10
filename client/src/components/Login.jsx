import { useState } from "react";
import Axios from "axios";
import "../App.css";
import { baseUrl } from "../config";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(`${baseUrl}/auth/login`, {
      email: formFields.email,
      password: formFields.password,
    }).then(res => {
        setLoading(false);
        // console.log(res.data);
        if(res.data.status){
            // console.log(res.data);
            navigate('/home');
          }
    }).catch(err => {
        setLoading(false);
        console.log(err);
    })
  };

  return (
    <div className="sign-up-container">
      <h2>Login</h2>
      <form action="" className="sign-up-form" onSubmit={handleSubmit}>        

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

        <button type="submit" disabled={loading} >{loading ? "Loading..." : "Login"}</button>
        <p>Don&apos;t have account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
