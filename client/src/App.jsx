import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import Capture from './pages/Capture'
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Post from './pages/Post';
import Search from './pages/Search'
import Footer from './components/Footer'
import Faq from './pages/Faq'
import Privacy from './pages/Privacy'
import Support from './pages/Support'
import Terms from './pages/Terms'
import Watch from './pages/Watch'
import InterviewRoom from './pages/InterviewRoom'


export default function App() {
  return (
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      
      <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/update-post/:postId" element={<UpdatePost />} />
      <Route path='/interview-room' element={<InterviewRoom />}/>
      <Route path='/capture' element={<Capture />} />
      </Route>

      
      <Route path='/search' element={<Search />}/>
      <Route path='/watch' element={<Watch />}/>

      <Route path="/about" element={<About />} />
      <Route path='/faq' element={<Faq />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path='/support' element={<Support />} />
      <Route path='/terms' element={<Terms />} />

      
      <Route path="/post/:postId" element={<Post />} />
    </Routes>
    <Footer />

  </BrowserRouter>
  );
}

