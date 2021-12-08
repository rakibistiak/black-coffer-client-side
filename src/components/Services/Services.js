import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import Service from '../Service/Service';
import './Services.css'
const Services = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsloading] = useState(true)
    useEffect(() => {
        setIsloading(true)
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => {
                setIsloading(false)
                setServices(data)
            })
    }, [])
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
            <Container>
                <Row className='g-4'>
                    {
                        services.map(service => <Service key={service?._id} service={service}></Service>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Services;