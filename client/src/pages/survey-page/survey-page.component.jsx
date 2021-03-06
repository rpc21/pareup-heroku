import React from 'react';
import { DropdownList } from 'react-widgets'
import { Multiselect } from 'react-widgets';
import ED_LEVELS from '../../fields/ed_levels';
import JOB_TITLES from '../../fields/job_titles';
import NEGOTIATED from '../../fields/negotiated';
import COMPANY_SIZES from '../../fields/company_sizes';
import RACES from '../../fields/races';
import PRONOUNS from '../../fields/pronouns';
import 'react-widgets/dist/css/react-widgets.css'
import { Jumbotron, Row, Col, Container, Form, Button, Modal } from "react-bootstrap"
import './survey-page.component.css';
import STATE_CITY_LIST from '../../fields/states_cities';
import STATES from '../../fields/states';
import { Dropdown } from 'semantic-ui-react'
import { useState } from 'react';


import axios from 'axios';

class SurveyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            intervalIsSet: false,

            job_title: "",
            ed_level: "",
            company_size: "",
            salary: 0,
            equity: 0,
            negotiated: "",
            one_time: 0,
            year: "",
            selected_state: "Alabama",
            selected_city: "Abanda",
            selected_lat: 0,
            selected_long: 0,
            race: "",
            ethnicity: "",
            pronouns: "",
            data: [],
            school: 'Duke University',
            show: false

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);


    }


    handleSubmit(event) {
        event.preventDefault();

        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('/api/putData', {
            job_title: this.state.job_title,
            ed_level: this.state.ed_level,
            company_size: this.state.company_size,
            salary: this.state.salary,
            equity: this.state.equity,
            negotiated: this.state.negotiated,
            year: this.state.year,
            one_time: this.state.one_time,
            lat: this.state.selected_lat,
            long: this.state.selected_long,
            race: this.state.race,
            ethnicity: this.state.ethnicity,
            pronouns: this.state.pronouns,
            school: this.state.school
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ show: true })
        this.handleClear(event);
    }

    handleClear(event) {
        this.setState({
            job_title: "",
            ed_level: "",
            company_size: "",
            salary: "",
            equity: "",
            year: "",
            negotiated: "",
            one_time: "",
            selected_state: "Alabama",
            selected_city: "Abanda",
            selected_lat: 0,
            selected_long: 0,
            race: "",
            ethnicity: "",
            pronouns: "",
            school: "Duke University",
            data: []
        })
    }




    render() {

        return (
            <div style={{ paddingTop: 70 }} className='App'>
                <h1 style={{ color: `#007788`, textAlign: "left", display: "inline" }}> Submit your Offer</h1>
                <h4 style={{ color: `#007788`, textAlign: "left", display: "inline" }}> <i>by filling in the survey below</i></h4><br />
                <h5>We understand that talking about money and salaries is sometimes considered taboo, but the more transparent we all become about our offers, the closer we will get to achieving pay equity for all. Your response will remain completely anonymous. We thank you for your help and encourage you to join the fight for pay equity!</h5>
                <br />
                <div className="form-container">
                    <Form className='filter-list'>
                        <h3>Company Information (Required)</h3>
                        <Form.Row>
                            <Col>
                                <Form.Label>Company Location</Form.Label>
                                <br></br>
                                <Dropdown placeholder='State'
                                    search selection options={STATES.map(dat => ({ key: dat, value: dat, text: dat }))}
                                    onChange={(event, val) => this.setState({ selected_state: val.value }, () => console.log())} />
                                <Dropdown placeholder='City'
                                    search selection options={STATE_CITY_LIST[this.state.selected_state].map(dat => ({ key: dat.city, value: dat.city, text: dat.city }))}
                                    onChange={(event, val) => this.setState({
                                        selected_city: val.value,
                                        selected_lat: STATE_CITY_LIST[this.state.selected_state].filter(function getSelCityObject(object) {
                                            return object.city == val.value
                                        })[0].lat,
                                        selected_long: STATE_CITY_LIST[this.state.selected_state].filter(function getSelCityObject(object) {
                                            return object.city == val.value
                                        })[0].long
                                    }, () => console.log(this.state))} />

                                <br></br>
                            </Col>
                            <Col>
                                <Form.Label>Company Size</Form.Label>
                                <br></br>
                                <Dropdown placeholder='Select the company size'
                                    search selection options={COMPANY_SIZES.map(dat => ({ key: dat.name, value: dat.value, text: dat.name }))}
                                    onChange={(event, val) => this.setState({
                                        company_size: val.value
                                    }, () => console.log(this.state))} />
                                <br></br>
                            </Col>
                        </Form.Row>
                        <br></br>
                        <h3>Compensation Information (Required)</h3>
                        <Form.Row>
                            <Col>
                                <Form.Label>Base Salary </Form.Label>
                                <br></br>
                                <input className="number-input"
                                    type="number"
                                    name="salary"
                                    placeholder="$"
                                    required={true}
                                    onChange={(event) => this.setState({
                                        salary: event.target.value
                                    }, () => console.log(this.state))} />
                                <br></br>
                                <br></br>
                                <Row>
                                    <Col>
                                        <Form.Label>One-Time Bonuses </Form.Label>
                                        <br></br>
                                        <input className="number-input"
                                            type="number"
                                            name="bonus"
                                            placeholder="$, 0 if N/A"
                                            required={true}
                                            onChange={(event) => this.setState({
                                                one_time: event.target.value
                                            }, () => console.log(this.state))} />
                                        <br></br>
                                    </Col>

                                    <Col>
                                        <Form.Label>Equity</Form.Label>
                                        <br></br>
                                        <input className="percent-input"
                                            type="number"
                                            name="equity"
                                            placeholder="$, 0 if N/A"
                                            required={true}
                                            onChange={(event) => this.setState({
                                                equity: event.target.value
                                            }, () => console.log(this.state))} />
                                        <br></br>
                                    </Col>
                                </Row>

                                <br></br>
                                <br></br>
                                <Form.Label>Did you negotiate this offer?</Form.Label>
                                <br></br>
                                <Dropdown placeholder='Select Yes or No'
                                    search selection options={NEGOTIATED.map(dat => ({ key: dat.name, value: dat.value, text: dat.value }))}
                                    onChange={(event, val) => this.setState({
                                        negotiated: val.value
                                    }, () => console.log(this.state))} />



                                <br></br>
                            </Col>
                            <Col>
                                <Form.Label>Job Title</Form.Label>
                                <br></br>
                                <Dropdown placeholder='Select your job title'
                                    search selection options={JOB_TITLES.map(dat => ({ key: dat.name, value: dat.value, text: dat.value }))}
                                    onChange={(event, val) => this.setState({
                                        job_title: val.value
                                    }, () => console.log(this.state))} />
                                <br></br>
                                <br></br>
                                <Form.Label>Education Level</Form.Label>
                                <br></br>
                                <Dropdown placeholder='Select your current or most recent level of education'
                                    search selection options={ED_LEVELS.map(dat => ({ key: dat.name, value: dat.value, text: dat.value }))}
                                    onChange={(event, val) => this.setState({
                                        ed_level: val.value
                                    }, () => console.log(this.state))} />
                                <br></br>
                                <br></br>
                                <Form.Label>In what year did you receive this offer?</Form.Label>
                                <br></br>
                                <input className="number-input"
                                    type="number"
                                    name="year"
                                    placeholder="Year"
                                    required={true}
                                    onChange={(event) => this.setState({
                                        year: event.target.value
                                    }, () => console.log(this.state))} />
                                <br></br>

                            </Col>
                        </Form.Row>
                        <br></br>
                        <h3>Personal Information (Optional)</h3>
                        <Form.Row>
                            <Col>
                                <Form.Label>Race</Form.Label>
                                <br></br>
                                <Dropdown className='dropdown'
                                    value={this.state.race}
                                    placeholder='Select the race(s) you identify with'
                                    fluid multiple search selection options={RACES.map(dat => ({ key: dat.name, value: dat.value, text: dat.value }))}
                                    onChange={(event, val) => this.setState({
                                        race: val.value
                                    }, () => console.log(this.state))} />
                                <br></br>
                                <Form.Label>Do you identify as Hispanic or Latinx?</Form.Label>
                                <div className="radio">
                                    <label>
                                        <input type="radio"
                                            value="hispanic_latinx"
                                            checked={this.state.ethnicity === 'hispanic_latinx'}
                                            onClick={(event) => this.setState({
                                                ethnicity: 'hispanic_latinx'
                                            }, () => console.log(this.state))} />
                                        Yes
                                  </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio"
                                            value="Not_Hispanic_Latinx" checked={this.state.ethnicity === 'not_hispanic_latinx'}
                                            onClick={(event) => this.setState({
                                                ethnicity: 'not_hispanic_latinx'
                                            }, () => console.log(this.state))} />
                                        No
                                  </label>
                                </div>
                                <br></br>
                            </Col>
                            <Col>
                                <Form.Label>Personal Pronouns</Form.Label>
                                <br></br>
                                <Dropdown placeholder='Select the pronouns you most closely identify with'
                                    search selection options={PRONOUNS.map(dat => ({ key: dat.name, value: dat.value, text: dat.value }))}
                                    onChange={(event, val) => this.setState({
                                        pronouns: val.value
                                    }, () => console.log(this.state))} />
                                <br></br>
                            </Col>
                            <br></br>
                        </Form.Row>
                        <Form.Row style={{ marginTop: '50px' }}>
                            {/* <Button className="clear-btn" 
                                    align="center" 
                                    onClick={this.handleClear}>
                                    Clear
                            </Button> */}
                            <Button className="submit-btn"
                                align="center"
                                onClick={this.handleSubmit}>
                                Submit
                            </Button>
                            <Modal show={this.state.show}>
                                <Modal.Header>
                                    <Modal.Title>Thank you for submitting your offer!</Modal.Title>
                                </Modal.Header>
                                <Modal.Footer>
                                    <Button size="lg" style={{ backgroundColor: '#007788', borderColor: '#007788' }}>
                                        <a href="/survey" className="nav-bar-link no-effect-on-hover">
                                            Submit Another Offer
                            </a>
                                    </Button>
                                    <Button size="lg" style={{ backgroundColor: '#007788', borderColor: '#007788' }}>
                                        <a href="/offers" className="nav-bar-link no-effect-on-hover">
                                            Browse Offers
                            </a>
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Form.Row>
                    </Form>
                </div>
            </div>
        )
    }
}

export default SurveyPage;