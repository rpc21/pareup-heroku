import React from 'react';
import './welcome-page.component.css';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Link from "../../components/nav-bar/nav-bar.component";
import Helmet from "react-helmet";

class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        };
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
                <div style={{ paddingTop: 200 }}>
                    <Helmet bodyAttributes={{ style: 'background-color: #FFFFFF' }} />
                    <Row>
                        <Col md={2} /> {/* this is just an offset to center the column below. Note a row will add up to 12 total. */}
                        <Col md={8} className="text-center">
                            <h1> Welcome to <span style={{ color: `#007788` }}>PareUp</span></h1>
                            <h4> <i><span style={{ color: `#65CCA0` }}>Transparency, Together</span></i></h4>
                            <p>
                                <br />
                                If you don't know what you should be paid, negotiating your best offer is hard.  <br />
                                <br />
                                View salaries offered to current and past Duke students
                            to get an idea of what you should ask for. <br />
                                Filter by job title, location, company size, and more.
                        </p>
                            <p>
                                Click the button below to check it out!
                        </p>
                            {/* <Row>
                            <Col md={3}/>
                            <Col md={3}> */}
                            <Button size="lg" style={{ backgroundColor: '#007788', borderColor: '#007788' }}>
                                <a href="/offers" className="nav-bar-link no-effect-on-hover">
                                    Browse Offers
                            </a>
                            </Button>
                            {/* </Col>
                            <Col md={3}>
                                <Button size="lg" style={{ backgroundColor: '#007788', borderColor: '#007788' }}>
                                    <a href="/survey" className="nav-bar-link no-effect-on-hover">
                                        Submit Offer
                            </a>
                                </Button>
                            </Col>
                            <Col md={3}/>
                        </Row> */}
                        </Col>
                    </Row>
                </div>
            )
        }
        else{
            return (
                <div style={{ paddingTop: 200 }}>
                    <Helmet bodyAttributes={{ style: 'background-color: #FFFFFF' }} />
                    <Row>
                        <Col md={1} /> {/* this is just an offset to center the column below. Note a row will add up to 12 total. */}
                        <Col md={10} className="text-center">
                            <h1> Welcome to <span style={{ color: `#007788` }}>PareUp</span></h1>
                            <h4> <i><span style={{ color: `#65CCA0` }}>Transparency, Together</span></i></h4>
                            <p>
                                <br />
                                If you don't know what you should be paid, negotiating your best offer is hard.  <br />
                                <br />
                                View salaries offered to current and past Duke students
                            to get an idea of what you should ask for. <br />
                                Filter by job title, location, company size, and more.
                        </p>
                            <p>
                                Click the button below to check it out!
                        </p>
                            {/* <Row>
                            <Col md={3}/>
                            <Col md={3}> */}
                            <Button size="lg" style={{ backgroundColor: '#007788', borderColor: '#007788' }}>
                                <a href="/offers" className="nav-bar-link no-effect-on-hover">
                                    Browse Offers
                            </a>
                            </Button>
                            {/* </Col>
                            <Col md={3}>
                                <Button size="lg" style={{ backgroundColor: '#007788', borderColor: '#007788' }}>
                                    <a href="/survey" className="nav-bar-link no-effect-on-hover">
                                        Submit Offer
                            </a>
                                </Button>
                            </Col>
                            <Col md={3}/>
                        </Row> */}
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default WelcomePage;