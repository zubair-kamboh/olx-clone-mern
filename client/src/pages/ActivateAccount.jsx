import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { ThreeDots } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activateAccount, reset } from '../redux/auth/authSlice'
import '../styles/login.css'

const ActivateAccount = () => {
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
    dispatch(activateAccount(token))

    dispatch(reset())
  }

  if (isLoading) {
    return <ThreeDots color="#3a77ff" height={500} width={500} />
  }

  return (
    <div>
      <Container>
        <form className="contactform" onSubmit={handleSubmit}>
          <h1 className="text-center">Please Activate Your Account</h1>

          <div className="pt-4 text-center">
            <Button
              style={{ background: 'tomato', width: '50%', margin: 'auto' }}
              type="submit"
            >
              ACTIVATE
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default ActivateAccount
