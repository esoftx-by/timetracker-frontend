import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Alert} from "@mui/material";
import {taskType} from "../../types";
// @ts-ignore
import style from './TaskCard.module.css'
import {FC} from "react";


type OwnToProps = {
    data: taskType
}

const OutlinedCard: FC<OwnToProps> = ({data}) => {

    return (
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <div className={style.taskCard}>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {data.currentAssignee.firstName + ' ' + data.currentAssignee.lastName}
                                </Typography>
                                <Alert icon={false} severity="info">{data.status}</Alert>
                            </div>
                            <Typography variant="h5" component="div">
                                {data.name}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                {'Estimated time: ' + data.estimatedHours + ' hours'}
                            </Typography>
                            <Typography variant="body2">
                                {data.description}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card>
    );
}

export default OutlinedCard
