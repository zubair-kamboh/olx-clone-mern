import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { findAccount, reset } from '../redux/auth/authSlice'
import '../styles/login.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const { errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.auth)

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
    }

    if (isSuccess) {
      toast.success(successMessage)
    }
    return () => dispatch(reset())
  }, [isError, isSuccess, errorMessage, successMessage, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email,
    }
    dispatch(findAccount(data))
    setEmail('')
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
          style={{ width: '50%', margin: 'auto' }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Please find your account</h1>

          <div className="my-4">
            <p className="input_label">Enter your email</p>
            <div className="input_container">
              <input
                type="text"
                placeholder="Your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <Button style={{ background: '#333', width: '100%' }} type="submit">
            Find
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default ForgetPassword
