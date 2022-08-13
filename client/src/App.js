import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles/footer.css'
import PostAd from './pages/PostAd'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ActivateAccount from './pages/ActivateAccount'
import ChangePassword from './pages/ChangePassword'
import FindAccount from './pages/FindAccount'
import { Toaster } from 'react-hot-toast'
import { PublicRoute, ProtectedRoute } from './utilities/ProtectedRoute'
import Ad from './pages/Item'
import MyAds from './pages/MyAds'
import UpdateAd from './pages/UpdateAd'

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <PostAd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/activate/:token"
            element={
              <PublicRoute>
                <ActivateAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/change-password/:token"
            element={
              <PublicRoute>
                <ChangePassword />
              </PublicRoute>
            }
          />
          <Route
            path="/find-account"
            element={
              <PublicRoute>
                <FindAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/myads"
            element={
              <ProtectedRoute>
                <MyAds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/item/:id"
            element={
              <ProtectedRoute>
                <UpdateAd />
              </ProtectedRoute>
            }
          />
          <Route path="/item/:id" element={<Ad />} />
        </Routes>
        <Footer />
      </Router>

      <Toaster />
    </div>
  )
}

export default App
