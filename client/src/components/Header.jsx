import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { resetUser } from '../redux/auth/authSlice'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((select) => select.auth)

  const logout = () => {
    localStorage.clear()
    dispatch(resetUser())
  }

  const handleSellBtnClick = () => {
    if (!user) {
      toast.success('To post Ad, Please login')
    }
  }

  return (
    <Navbar bg="light" expand="lg" style={{ height: '80px' }}>
      <Container>
        <NavLink to="/" className="navbar-brand">
          <svg
            height="40"
            viewBox="0 0 36.289 20.768"
            alt="Olx logo"
            className="_063feb70"
          >
            <path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path>
          </svg>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex" style={{ flex: 1 }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
            />
          </Form>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {!user ? (
              <>
                <NavLink className="nav-link" to="/signin">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  Register
                </NavLink>
              </>
            ) : (
              <NavLink className="nav-link" to="/" onClick={logout}>
                Logout
              </NavLink>
            )}
            <NavLink
              className="nav-link"
              to="/post"
              onClick={handleSellBtnClick}
            >
              Sell
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
