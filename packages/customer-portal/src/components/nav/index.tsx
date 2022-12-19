import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react'
import { signout } from 'services/user'

function isActiveOn(pathname: string, currentPathname: string, exact?: boolean) {
  const regExp = new RegExp(`^${pathname}${exact ? '$' : ''}`)
  return regExp.test(currentPathname)
}

export default function MyNav() {
  const navigate  = useNavigate()
  const location = useLocation()
  const handleNavigate = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = (e.target as HTMLAnchorElement).getAttribute('href')
    href && navigate(href)
  }, [navigate])
  return (<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Customer Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" onClick={handleNavigate} active={isActiveOn('/', location.pathname, true)}>Home</Nav.Link>
            <Nav.Link href="/reservations" onClick={handleNavigate} active={isActiveOn('/reservations', location.pathname)}>My Reservations</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile" onClick={handleNavigate}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/signout" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  signout()
                  navigate('/signin')
              }}>
                Signout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>)
}