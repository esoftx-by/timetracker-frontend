import React, {FC} from 'react'
import {NavLink} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import { Button } from '@mui/material';

const NotFoundPage: FC<{}> = () => {
    return (
        <div style={{'width':'300px', 'margin':'20% auto'}}>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <div style={{'textAlign':'center'}}>
                <h1>Page not found</h1>
                <Button variant="contained"><NavLink style={{'color':'#fff'}} to={'/home'}>Back to main page</NavLink></Button>
            </div>
        </div>
    )
}

export default NotFoundPage
