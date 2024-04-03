import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import Capture from './pages/Capture'
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'


export default function App() {
  return  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/create-post" element={<CreatePost />} />
    </Route>
    <Route path='/capture' element={<Capture />} />
    <Route path="/about" element={<About />} />
   
  </Routes>

  </BrowserRouter>
}

