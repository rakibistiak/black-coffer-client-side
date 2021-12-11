import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import './Services.css'
const Services = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [filterMethod, setFilterMethod] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate()
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

    const handleSearchMethod = (event) => {
        setSearchKeyword(event.target.value)
    };

    const handleDetails = (id) => {
        navigate(`/data/${id}`)
    }

    useEffect(() => {
        if (filterMethod.toLowerCase() === 'topic') {
            const filteredData = services.filter(service => service.topic.toLowerCase().includes(searchKeyword.toLocaleLowerCase()));
            setFilteredData(filteredData)
        }
        else if (filterMethod.toLowerCase() === 'sector') {
            const filteredData = services.filter(service => service.sector.toLowerCase().includes(searchKeyword.toLocaleLowerCase()));
            setFilteredData(filteredData)
        }
        else if (filterMethod.toLowerCase() === 'region') {
            const filteredData = services.filter(service => service.region.toLowerCase().includes(searchKeyword.toLocaleLowerCase()));
            setFilteredData(filteredData)
        }
        else if (filterMethod.toLowerCase() === 'country') {
            const filteredData = services.filter(service => service.country.toLowerCase().includes(searchKeyword.toLocaleLowerCase()));
            setFilteredData(filteredData)
        }

        else if (filterMethod.toLowerCase() === 'source') {
            const filteredData = services.filter(service => service.source.toLowerCase().includes(searchKeyword.toLocaleLowerCase()));
            setFilteredData(filteredData)
        }
        else if (filterMethod.toLowerCase() === 'end_year') {
            const filteredData = services.filter(service => service.end_year === parseInt(searchKeyword));
            setFilteredData(filteredData)
        }
    }, [searchKeyword, filterMethod, services]);
    // Show Spinner until data loaded
    if (isLoading) {
        return (
            <Loader className='min-vh-100 d-flex align-items-center justify-content-center'
                type="Bars" color="#FF4742" height={80} width={80} />
        )
    }
    return (
        <div>
            {filteredData ? <h2>Total services available: {filteredData.length}</h2>
                :
                <h2>Total services available: {services.length} </h2>
            }
            <Form >
                <Form.Group className='mx-auto mb-4' as={Col} xs={12} md={6} lg={3} controlId="formGridfilter">
                    <Form.Label>Filter Method</Form.Label>
                    <Form.Select onChange={handleFilterMethod}>
                        <option>end_year</option>
                        <option>Topic</option>
                        <option>Sector</option>
                        <option>Region</option>
                        <option>Source</option>
                        <option>Country</option>
                    </Form.Select>
                </Form.Group>

                {filterMethod && <Form.Group className='mx-auto' as={Col} xs={12} md={6} lg={3} controlId="formGridfilter">
                    <Form.Control className='my-4' onChange={handleSearchMethod} type="text" placeholder={`Enter ${filterMethod}`} />
                </Form.Group>}
            </Form>
            <Container>
                <Row className='g-4'>
                    {
                        filteredData.map((service, index) => {
                            const { intensity, likelihood, relevance, country, topic, region, end_year, start_year, _id } = service || {};
                            return (
                                <Col xs={12} md={6} lg={4} key={index}>
                                    <div className='single-column'>
                                        <p>Intensity: {intensity || "Data not available"}</p>
                                        <p>Likelihood: {likelihood || "Data not available"}</p>
                                        <p>Relevance: {relevance || "Data not available"}</p>
                                        {
                                            (end_year && start_year) ? <p>Year: {`${end_year} - ${start_year}`}</p>
                                                :
                                                <p> Year: Data not available</p>
                                        }
                                        <p>Country: {country || "Data not available"}</p>
                                        <p>Topics: {topic || "Data not available"}</p>
                                        <p>Region: {region || "Data not available"}</p>
                                        <button className="btn-regular" onClick={() => handleDetails(_id)}>See Details</button>
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