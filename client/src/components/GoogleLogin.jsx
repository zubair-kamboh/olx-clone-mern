import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { googleLogin } from '../redux/auth/authSlice'

function GoogleLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    /* global google */
    const handleCredentialResponse = (response) => {
      dispatch(googleLogin(response))

      navigate('/')
    }
    google.accounts.id.initialize({
      client_id:
        '755428588274-5nl45or7hrlck14neughadquor3bjaph.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    })

    google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
      theme: 'dark',
      size: 'large',
      width: 240,
    })
    google.accounts.id.prompt()
  }, [dispatch, navigate])

  return <div id="buttonDiv"></div>
}

export default GoogleLogin
