import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {TaskType} from "../../types";
import style from './TaskCard.module.css'
import {FC, memo, useState} from "react";
import Utilities from "../../utilities";
import SelectStatus from "../SelectStatus";
import {Checkbox} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";


type OwnToProps = {
    data: TaskType
}

const OutlinedCard: FC<OwnToProps> = memo(({data}) => {

    const {status, currentAssignee, estimatedHours, description, name, id} = data

    const [editMode, setEditMode] = useState(false)

    const [localStatus, setLocalStatus] = useState(status)




    return (
        <Card variant="outlined" style={{borderRadius: "10px", margin: "1rem 0"}}>
            <React.Fragment>
                <CardContent>
                    <div className={style.taskCard}>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {currentAssignee.firstName + ' ' + currentAssignee.lastName}
                        </Typography>
                        {!editMode ? <div style={{cursor: 'pointer'}} className={localStatus}
                                          onClick={() => setEditMode(true)}>{localStatus.replace('_', ' ')}</div> :
                            <SelectStatus activeStatus={localStatus} taskId={id} setLocalStatus={setLocalStatus} setEditMode={setEditMode}/>}
                    </div>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Estimated time: <em className={style.time}>{Utilities.getTimeFromMins(estimatedHours * 60)}</em>
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </CardContent>
            </React.Fragment>
        </Card>
    );
})

export default OutlinedCard
