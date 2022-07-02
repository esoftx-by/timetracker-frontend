import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Alert, Grid} from "@mui/material";



export default function OutlinedCard({data}) {
    return (
        <Grid item xs={12} md={4}>
            <Box sx={{maxWidth: 500}}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <div style={{'display':'flex', 'justify-content': 'space-between', 'align-items':'center'}}>
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
                        {/*<CardActions>*/}
                        {/*    <Button size="small">Learn More</Button>*/}
                        {/*</CardActions>*/}
                    </React.Fragment>
                </Card>
            </Box>
        </Grid>
    );
}
