import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div>
      <Navbar bg="secondary" variant="light" fixed="top">
        <Container>          
          <Link className='navbar-brand' to="/">Home</Link>
          <Nav className="me-auto">
            <Link className="nav-link" to="/usuarios">Usuários</Link>
            <Link className="nav-link" to="/clientes">Clientes</Link>
            <Link className="nav-link" to="/pets">Pets</Link>
          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default Menu