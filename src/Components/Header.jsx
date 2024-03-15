import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { AppBar, Box, Typography, Toolbar, Button, IconButton } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';

import { useContext } from 'react';
import { AuthorizedContext } from '../Utils/Authorized';

export default function Header() {
    const navigate = useNavigate();
    const { auth, confirmReLogin } = useContext(AuthorizedContext);

    confirmReLogin();

    function navigatePage(PageName) {
        enqueueSnackbar(`Visiting ${(PageName === "" || PageName === undefined || PageName === null) ? "Home" : PageName} Page.`);
        navigate(`/${(PageName === "" || PageName === undefined || PageName === null) ? "" : PageName}`);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar sx={{ backgroundColor: 'rgb(25, 30, 32)' }}>
                    <Button onClick={(e) => {navigatePage()}} sx={{ my: 2, color: 'white', display: 'block' }}>HOME</Button>
                    <Button onClick={() => {navigatePage("About")}} sx={{ my: 2, color: 'white', display: 'block' }}>ABOUT</Button>
                    <Button onClick={() => {navigatePage("Art")}} sx={{ my: 2, color: 'white', display: 'block' }}>ART</Button>
                    {auth && (<Button onClick={() => {navigatePage("Admin")}} sx={{ my: 2, color: 'white', display: 'block' }}>ADMIN</Button>)}

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

                    {!auth && (<IconButton onClick={() => {navigatePage("Login")}} size='large' edge='start' color='inherit' aria-label='profile' sx={{ mr: 2 }}><AccountCircle/></IconButton>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
}