import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'


const Register = () => {

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Register</h3>

        <RegisterForm />
        
        <p className="mt-2">
          {`Already have an account? `}
        </p>

      </div>
    </div>
  )
}

export default Register