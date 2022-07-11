import logo from './logo.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import decodeJwt from 'jwt-decode'

function App() {
  const handleCredentialResponse = (response) => {
    const user = decodeJwt(response.credential)

    axios({
      method: 'POST',
      url: '/api/auth/googlelogin',
      headers: {
        Authorization: `Bearer ${response.credential}`,
      },
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '755428588274-5nl45or7hrlck14neughadquor3bjaph.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    })

    google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
      theme: 'outline',
      size: 'large',
    })
    google.accounts.id.prompt()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="buttonDiv"></div>
      </header>
    </div>
  )
}

export default App
