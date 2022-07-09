import React, {FC} from 'react'
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import { Button } from '@mui/material';


const NotFoundPage: FC<{}> = () => {
    let navigate = useNavigate()
    let goBack = () => {
        navigate('/home')
    }

    return (
        <div style={{'width':'300px', 'margin':'20% auto'}}>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <div style={{'textAlign':'center'}}>
                <h1>Page not found</h1>
                <Button onClick={goBack} variant="contained">Back to main page</Button>
            </div>
        </div>
    )
}

export default NotFoundPage
