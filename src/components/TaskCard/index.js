import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";


export default function OutlinedCard({data}) {
    return (
        <Grid item xs={12} md={4}>
            <Box sx={{maxWidth: 500}}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {'Current Assignee: ' + data.currentAssignee.firstName + ' ' + data.currentAssignee.lastName}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {'Task Name: ' + data.name}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                {'Estimated time: ' + data.estimatedHours + ' hours'}
                            </Typography>
                            <Typography variant="body2">
                                {'Description Task: ' + data.description}
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
