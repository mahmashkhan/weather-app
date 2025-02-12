import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WeatherCards from './WeatherCards';

export default function header() {
    return (<>
        <Box  sx={{ flexGrow: 2 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="red"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                       
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Weather App
                    </Typography>
                    

                </Toolbar>
            </AppBar>
        </Box>
        <WeatherCards/>
        </>
    )
}

