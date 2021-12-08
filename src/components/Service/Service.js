import React from 'react';
import { Col } from 'react-bootstrap';
import './Service.css'
const Service = ({service}) => {
    const {intensity,likelihood ,relevance, year, country, topic, region, city } = service || {};
    return (
        <Col xs={12} md={6} lg={4} >
            <div className='single-column'>
                <p>Intensity: {intensity}</p>
                <p>Likelihood: {likelihood}</p>
                <p>Relevance: {relevance}</p>
                <p>Year: {year}</p>
                <p>Country: {country}</p>
                <p>Topics: {topic}</p>
                <p>Region: {region}</p>
                <p>City: {city}</p>
            </div>
        </Col>
    );
};

export default Service;