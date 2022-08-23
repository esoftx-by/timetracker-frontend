import React, {useEffect, useState} from 'react'
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar";
import {UserType} from "../types";
import {privateRoutes, publicRoutes} from "./indexRoutes";
import Box from "@mui/material/Box";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import BallotIcon from '@mui/icons-material/Ballot';
import EventIcon from '@mui/icons-material/Event';

export const useRoutes = (isAuthenticated: boolean, userId: any, userData: UserType | null) => {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    if (isAuthenticated && userData) {
        return (
            <>
                <ResponsiveAppBar matches={matches}/>
                <div className="content">
                    <Routes>
                        {privateRoutes.map(el => <Route path={el.path} element={<el.element/>}/>)}
                        <Route path={`//login`} element={<Navigate to={'/home'}/>}/>
                    </Routes>
                </div>
                {!matches && <SimpleBottomNavigation/>}
            </>
        )
    }

    return (
        <>
            <Routes>
                {publicRoutes.map(el => <Route path={el.path} element={<el.element/>}/>)}
                <Route path="/" element={<Navigate to={'/login'} replace/>}/>
            </Routes>
        </>
    )

}


function SimpleBottomNavigation() {

    const buttonNavigation = [
        {id: 0, name: 'home', icon: <HomeIcon />},
        {id: 1, name: 'projects', icon: <BallotIcon />},
        {id: 2, name: 'calendar', icon: <EventIcon />}
    ]

    let activePage: any = buttonNavigation.find(el =>  '/' + el.name === window.location.pathname)

    const [value, setValue] = React.useState(activePage ? activePage.id : 0);

    return (
        <Box sx={{ width: '100%', position:'fixed', bottom: '0' , zIndex: 10}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {buttonNavigation.map(el=> <BottomNavigationAction key={el.id} label={el.name} icon={el.icon} component={Link} to={el.name} />)}
            </BottomNavigation>
        </Box>
    );
}
