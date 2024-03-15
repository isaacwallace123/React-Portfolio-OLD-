import { useContext } from 'react';
import { AuthorizedContext } from '../../Utils/Authorized';

import "./Login.css";

import { useNavigate } from "react-router-dom";

import { Card, Avatar, CardContent, CardActions, Typography, Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {
    const navigate = useNavigate();
    const { Validate, auth } = useContext(AuthorizedContext);

    const checkUser = async(user, pass) => {
        if(await Validate(user, pass)) return navigate('/admin');
    }

    if (auth) {navigate('/')};

    return (
        <div>
            <Card sx={{ backgroundColor: 'rgb(25, 30, 32)', minWidth: 250, maxWidth: 500, padding: '0.5rem', margin: '11rem auto' }}>
                <CardContent>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main', margin: 'auto' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h4" color='white' sx={{ textAlign: 'center', margin: '0.5rem' }}>Sign In</Typography>
                    <br />
                    <TextField required fullWidth id="email" InputLabelProps={{ style: { color: 'white' } }} label="Username" name="email" autoComplete="username" autoFocus sx={{ margin: '10px auto', input: { color: 'white' } }} />
                    <br /><br />
                    <TextField required fullWidth name="password" InputLabelProps={{ style: { color: 'white' } }} label="Password" type="password" id="password" autoComplete="current-password" sx={{ margin: 'auto', input: { color: 'white' } }} />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" style={{ color: 'white' }} />} label="Remember me" sx={{ color: 'white' }} />
                </CardContent>

                <CardActions>
                    <Button onClick={(e) => { checkUser(document.getElementById('email').value, document.getElementById('password').value) }} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                </CardActions>
            </Card>
        </div>
    );
}