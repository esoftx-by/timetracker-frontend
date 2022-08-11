import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import style from './preloader.module.css'

export default function CircularIndeterminate() {
    return (
        <div className={style.loader}>
            <Box className={style.preloader} sx={{'display': 'flex'}}>
                <CircularProgress/>
            </Box>
        </div>
    );
}
