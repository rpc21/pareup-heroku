import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "react-router-dom/Link";
import Col from "react-bootstrap/Col";
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import './nav-bar.components.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBContainer,
    MDBHamburgerToggler
} from 'mdbreact';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse1: false,
            collapseID: ''
        }
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
    }

    toggleSingleCollapse = collapseId => {
        this.setState({
            ...this.state,
            [collapseId]: !this.state[collapseId]
        });
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };


    render() {
        const { width } = this.state;
        const isTooNarrow = width <= 1000;
        if (!isTooNarrow) {
            return (
                <Navbar fixed="top" style={{ backgroundColor: '#55D2D1' }} className="nav-bar pareup-blue-bg mt-auto mb-auto" expand="lg">
                    <Col sm="auto">
                        <Link to="/">
                            <img
                                src={logo2}
                                width="180"

                                className="d-inline-block align-top"
                                alt="PareUp Logo"
                            />
                        </Link >
                    </Col>
                    <Nav className="ml-auto">
                        <Col sm="auto">
                            <Link className="nav-bar-link" to="/offers">Browse Offers</Link>
                        </Col>
                        <Col sm="auto">
                            <Link className="nav-bar-link" to="/survey">Submit Offer</Link>
                        </Col>
                        <Col sm="auto">
                            <Link className="nav-bar-link" to="/negotiation-tips">Negotiation Tips</Link>
                        </Col>

                    </Nav>
                </Navbar>
            )
        }
        else {
            return (

                <MDBContainer>
                    <MDBNavbar fixed="top" style={{ backgroundColor: '#55D2D1' }} className="nav-bar pareup-blue-bg mt-auto mb-auto" expand="lg">
                        <MDBContainer>
                            <MDBNavbarBrand>
                                <Link to="/">
                                    <img
                                        src={logo2}
                                        width="180"

                                        className="d-inline-block align-top"
                                        alt="PareUp Logo"
                                    />
                                </Link >
                            </MDBNavbarBrand>
                            <MDBHamburgerToggler color="#ffffff" id="hamburger1" onClick={() => this.toggleSingleCollapse('collapse1')} />
                            <MDBCollapse isOpen={this.state.collapse1} navbar>
                                <MDBNavbarNav>
                                    <MDBNavItem className="ml-auto">
                                        <MDBNavLink className="nav-bar-link" to="/offers">Browse Offers</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem className="ml-auto">
                                        <MDBNavLink className="nav-bar-link" to="/survey">Submit Offer</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem className="ml-auto">
                                        <MDBNavLink className="nav-bar-link" to="/negotiation-tips">Negotiation Tips</MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>
                </MDBContainer>
            )
        }
    }
}

export default NavBar;