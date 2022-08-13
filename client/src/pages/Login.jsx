import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLogin from '../components/GoogleLogin'
import { login, reset } from '../redux/auth/authSlice'
import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.auth)

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
    }

    if (isSuccess) {
      toast.success(successMessage)
      navigate('/')
    }

    return () => dispatch(reset())
  }, [isError, isSuccess, errorMessage, successMessage, dispatch, navigate])

  useEffect(() => {}, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email,
      password,
      password2,
    }
    dispatch(login(data))
  }

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThreeDots color="#3a77ff" height={100} width={100} />
      </div>
    )
  }

  return (
    <div>
      <Container>
        <form
          className="contactform"
          onSubmit={handleSubmit}
          style={{ width: '50%', margin: 'auto' }}
        >
          <h1 className="text-center">SIGN IN</h1>

          <div className="text-center mt-3 googleBtn">
            <GoogleLogin />
            <h3 className="mt-3">OR</h3>
          </div>

          <div className="my-4">
            <p className="input_label">Email</p>
            <div className="input_container">
              <input
                type="text"
                placeholder="Enter you email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="my-4">
            <p className="input_label">Password</p>
            <div className="input_container">
              <input
                type="text"
                placeholder="Enter you password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="my-4">
            <p className="input_label">Confirm Password</p>
            <div className="input_container">
              <input
                type="text"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
          </div>
          <Button style={{ background: '#333', width: '100%' }} type="submit">
            Sign In
          </Button>

          <Link to="/find-account" style={{ color: '#333' }}>
            Forgot password?
          </Link>
        </form>
      </Container>
    </div>
  )
}

export default Login
