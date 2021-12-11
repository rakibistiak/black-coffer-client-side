import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import { useNavigate, useParams } from 'react-router-dom';

const ServiceDetails = () => {
    const [singleData, setSingleData] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const nagigate = useNavigate();
    const {id} = useParams();
    const handleGoBack=()=>{
        nagigate(-1)
    }
    useEffect(()=>{
        setIsloading(true)
        fetch(`http://localhost:5000/data/${id}`)
        .then(res=>res.json())
        .then(data => {
            setIsloading(false)
            setSingleData(data)
        })
    },[id]);
    // Show Spinner until data loaded
    if (isLoading) {
        return (
            <Loader className='min-vh-100 d-flex align-items-center justify-content-center'
            type="Bars" color="##FF4742" height={80} width={80}/>
        )
    }
    return (
        <div>
            <p>{singleData?.title}</p>
            <button className="btn-regular" onClick={handleGoBack}>Go Back</button>
        </div>
    );
};

export default ServiceDetails;