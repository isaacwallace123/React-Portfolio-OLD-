require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Users = require("./Data/Users.json");

const PORT = process.env.API_PORT;

const app = express();

app.use(cors());

app.use('/authenticate', (req, res) => {
    const Username = req.query.username;
    const Password = req.query.password

    const ReturnRequest = (Result) => {
        res.send({
            result: Result
        })
    }

    if(!Username || !Password) return ReturnRequest(false);

    let RequestedUserAccess;

    Users.map((User) => {
        if(User.Username === Username && User.Password === Password) {
            RequestedUserAccess = User;
        }
    });

    if(!RequestedUserAccess) return ReturnRequest(false);

    return ReturnRequest(RequestedUserAccess);
});

app.listen(PORT, () => console.log("\u001B[31m" + `[SERVER] API is running on http://localhost:${PORT}/`));