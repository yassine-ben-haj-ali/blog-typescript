import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
    <Header/>
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        <LoginForm />

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">Forgot password?</span>
        </small>

        <p>
          {`You don't have an account? `}
          Register Now
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
