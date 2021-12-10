import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import './Services.css'
const Services = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [filterMethod, setFilterMethod] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setIsloading(true)
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => {
                setIsloading(false)
                setServices(data.slice(0, 20));
                setFilteredData(data.slice(0, 20));
            })
    }, []);
    const handleFilterMethod = (event) => {
        setFilterMethod(event.target.value)
    };
    useEffect(()=>{
        const filteredData = services.filter(service=> service.topic.toLowerCase().includes(filterMethod.toLocaleLowerCase()));
        setFilteredData(filteredData)
    }, [filterMethod, services])
    if (isLoading) {
        return (
            <div className='text-center'>
                <Spinner style={{ paddingTop: '100px' }} animation="grow" variant="warning" />
            </div>
        )
    }
    return (
        <div>
            <h2>This is services {services.length}</h2>
            <Form >
                <Form.Group className='mx-auto' as={Col} xs={12} md={6} lg={3} controlId="formGridfilter">
                        <Form.Control className='my-4' onChange={handleFilterMethod} type="text" placeholder="Enter filter method" />
                </Form.Group>
            </Form>
            <Container>
                <Row className='g-4'>
                    {
                        filteredData.map((service, index) => {
                            const { intensity, likelihood, relevance, year, country, topic, region, city } = service || {};
                            return (
                                <Col xs={12} md={6} lg={4} key={index}>
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
                        })
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Services;