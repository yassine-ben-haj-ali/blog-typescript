import React, { useState } from "react";
import { InputChange, FormSubmit } from "../utils/TypeScript";
import { customRequest } from "../config/Api";

const LoginForm = () => {
  const initialState = { email: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);
  const { email, password } = userLogin;

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleLogin = (email: string, password: string) => {
    customRequest
      .post(
        "auth/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((response) => {
        const { access_token } = response.data.user;
        localStorage.setItem("token", access_token);
      })
      .catch((e) => console.log(e));
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email
        </label>

        <input
          type="text"
          className="form-control"
          id="account"
          name="email"
          value={email}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>

        <div className="pass">
          <input
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 mt-1"
        disabled={email && password ? false : true}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
