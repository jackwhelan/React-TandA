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

    leftNav = () => {
        if (localStorage.getItem('USER_ID')) {
            return (
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/"><i class="fas fa-home"></i> Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Dashboard"><i class="fas fa-columns"></i> Dashboard</NavLink>
                    </NavItem>
                </Nav>
            )
        }
        else {
            return (
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/"><i class="fas fa-home"></i> Home</NavLink>
                    </NavItem>
                </Nav>
            )
        }
    }

    rightNav = () => {
        if (localStorage.getItem('USER_ID')) {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/Account"><i class="fas fa-user-circle"></i> My Account</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#logout" onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i> Log Out</NavLink>
                    </NavItem>
                </Nav>
            )
        }
        else {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/Login"><i class="fas fa-sign-in-alt"></i> Log In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Register"><i class="fas fa-user-plus"></i> Register</NavLink>
                    </NavItem>
                </Nav>
            )
        }
    }

    handleLogout = () => {
        localStorage.clear()
        this.setState({
            redirectToReferrer: true
        });
    }

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to="/Goodbye" />
        }

        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <Container>
                        <NavbarBrand href="/">Staff Portal <span className="text-muted">| { this.getPath() }</span></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {
                                this.leftNav()
                            }
                            {
                                this.rightNav()
                            }
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(AppNavbar);