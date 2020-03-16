import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        isOpen: false,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getPath = () => {
        var path = this.props.location.pathname.slice(1);
        if (path === "") {
            path = "Home";
        }
        return path;
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <Container>
                        <NavbarBrand href="/">Staff Portal <span className="text-muted">| { this.getPath() }</span></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/Dashboard">Dashboard</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/Login">Log In</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/Register">Register</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(AppNavbar);