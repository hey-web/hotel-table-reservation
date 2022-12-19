import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, NavLink} from 'react-router-dom'
import MyRoutes from './Routes'


function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>

    <MyRoutes />
    </Router>
  )
}

export default App
