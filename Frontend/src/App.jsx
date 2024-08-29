import Login from './Components/Login/Login'
import './App.css'
import Register from './Components/Register/Register'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Home from './Components/HomePage/Home'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={Register}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
