import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Navbar,Nav, NavItem } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div >
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" > Home </Link>
            </Navbar.Brand>
          </Navbar.Header>

          <Nav pullRight >
            <NavItem eventKey={1} href="/" > Listar </NavItem>
            <NavItem eventKey={1} href="/add" > Adicionar </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default App;
