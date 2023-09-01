import { useState } from "react";
import { InputChange, FormSubmit } from "../utils/TypeScript";

const RegisterForm = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userRegister, setUserRegister] = useState(initialState);
  const { username, email, password, cf_password } = userRegister;


  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  // const handleSubmit = async (e: FormSubmit) => {
  //   e.preventDefault();
  //   try {
  //     const res = await api.post("auth/register", userRegister);
  //   } catch (err: any) {
  //     console.log(err.response.data.msg);
  //   }
  // };

  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>

        <input
          type="text"
          className="form-control"
          id="name"
          name="username"
          value={username}
          onChange={handleChangeInput}
          placeholder="Your name is up to 20 chars."
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email / Phone number
        </label>

        <input
          type="text"
          className="form-control"
          id="account"
          name="email"
          value={email}
          onChange={handleChangeInput}
          placeholder="Example@gmail.com/+84374481936"
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
            placeholder="Password must be at least 6 chars."
          />
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Confirm Password
        </label>

        <div className="pass">
          <input
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            placeholder="Your confirm password."
          />
        </div>
      </div>

      <button type="submit" className="btn btn-dark w-100 my-1">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
