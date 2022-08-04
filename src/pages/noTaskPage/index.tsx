import React from 'react';
import {useNavigate} from "react-router-dom";
import style from './NoTaskPage.module.css'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

const NoTaskPage = () => {

    const navigate = useNavigate()

    return (
        <div className={style.noTaskPage}>
            <Button onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
            <h1>Task not found or has been deleted</h1>
        </div>
    );
};

export default NoTaskPage;
