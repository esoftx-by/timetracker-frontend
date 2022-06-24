import * as React from 'react';
import style from './Track.module.css'


export default function VirtualizedList(props) {

    return (
        <div className={style.newTrack}>
            <div>Time: {props.traks.hours}h</div>
            <div>{props.traks.user.firstName + ' ' + props.traks.user.lastName}</div>
        </div>

    );
}
