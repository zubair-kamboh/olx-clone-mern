import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changePassword, reset } from '../redux/auth/authSlice'
import '../styles/login.css'

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const params = useParams()
  const token = params.token

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
      password,
      password2,
      token,
    }
    dispatch(changePassword(data))
    setPassword('')
    setPassword2('')
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
          style={{ width: '35%', margin: 'auto' }}
        >
          <h1 className="text-center">Please update your password</h1>

          <div className="my-4">
            <p className="input_label">New Password</p>
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
            <p className="input_label">Confirm New Password</p>
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
            Update
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default ChangePassword
