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
import { Redirect, withRouter } from 'react-router-dom';
import Clock from 'react-clock';

class AppNavbar extends Component {
    state = {
        isOpen: false,
        redirectToReferrer: false,
        date: new Date()
    }

    componentDidMount() {
        setInterval(
            () => {
                this.setState({ date: new Date() })
            },
            1000
        );
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
                        <NavLink href="/"><i className="fas fa-home"></i> Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Dashboard"><i className="fas fa-columns"></i> Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Clocking"><i className="fas fa-clock"></i> Clocking</NavLink>
                    </NavItem>
                </Nav>
            )
        }
        else {
            return (
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/"><i className="fas fa-home"></i> Home</NavLink>
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
                        <NavLink href="/Account"><i className="fas fa-user-circle"></i> My Account</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#logout" onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i> Log Out</NavLink>
                    </NavItem>
                </Nav>
            )
        }
        else {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/Login"><i className="fas fa-sign-in-alt"></i> Log In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Register"><i className="fas fa-user-plus"></i> Register</NavLink>
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
                <Navbar className="bg-navBlue" dark expand="lg">
                    <Container>
                        <Clock value={this.state.date} size={35} /><NavbarBrand style={{marginLeft: "1em"}} href="/">TIMA <span className="text-muted">| { this.getPath() }</span></NavbarBrand>
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