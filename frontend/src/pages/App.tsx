import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Contents from './Contents';

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Pokemon Management Application</Navbar.Brand>
            <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/trainers">Trainers</Nav.Link>
                <Nav.Link href="/pokemons">Pokemons</Nav.Link>
            </Nav>
            
        </Navbar>
    )
}

export default function App() {
    return (
        <div>
            <NavBar />
            <Contents />
        </div>
    );
}