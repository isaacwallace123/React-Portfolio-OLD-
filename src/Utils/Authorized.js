import { useState, createContext } from "react";
import { enqueueSnackbar } from 'notistack';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const TimeUntilExpired = (function() {
    const TimeInDays = 1;

    return ((((TimeInDays * 1000) * 60) * 60) * 24);
})();

export const AuthorizedContext = createContext();

const MakeID = (length) => {
    let result = '';
    let counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }

    return result;
}

const fetchToken = () => {
    return new Date().getTime();
}

const validKey = () => {
    let sessionKey = localStorage.getItem("sessionkey");

    if(!sessionKey) return false;

    sessionKey = DecodeKey(sessionKey);

    if(!sessionKey.PAYLOAD) return false;

    const currentTime = fetchToken();

    if(sessionKey.PAYLOAD.Expires < currentTime) return false;

    return sessionKey;
}

const setKey = (Username, Password) => {
    const sessionKey = createKey(Username, Password);

    localStorage.setItem("sessionkey",sessionKey);

    return sessionKey;
}

const fetchInfo = async(Username, Password) => {
    return fetch(`http://localhost:5000/authenticate?username=${Username}&password=${Password}`).then((res) => res.json());
}

const DecodeKey = (RawKey) => {
    const BrokenDown = RawKey.split(".");

    const HEADER = JSON.parse(atob(BrokenDown[0]));
    const PAYLOAD = JSON.parse(atob(BrokenDown[1]));
    const SIGNATURE = atob(BrokenDown[2]);

    return {
        HEADER: HEADER,
        PAYLOAD: PAYLOAD,
        SIGNATURE: SIGNATURE,
    }
}

const createKey = (username, password) => {
    const HEADER = {
        alg: "HS256",
        typ: "JWT",
    }

    const PAYLOAD = {
        Username: username,
        Password: password,
        Expires: fetchToken() + TimeUntilExpired
    }

    const EncryptedHeader = btoa(JSON.stringify(HEADER));
    const EncryptedPayload = btoa(JSON.stringify(PAYLOAD)).slice(0, -1);

    const GeneratedKey = EncryptedHeader + "." + EncryptedPayload;

    const SECRET = btoa(MakeID(32));

    return (GeneratedKey + "." + SECRET);
}

const Authorized = ({ children }) => {
    const [auth, setAuth] = useState(false);

    const [username, setUserName] = useState();

    const confirmReLogin = () => {
        const checkKey = validKey();

        if(checkKey && checkKey.PAYLOAD.Username && checkKey.PAYLOAD.Username) {
            setUserName(checkKey.PAYLOAD.Username);
            setAuth(true);

            return true
        }

        setAuth(false);
    
        return false;
    }

    const Validate = async(user, pass) => {
        if(confirmReLogin()) return true;

        if(!user) {enqueueSnackbar("Please be sure to input a username.", { variant: "warning" });return false}
        if(!pass) {enqueueSnackbar("Please be sure to input a password.", { variant: "warning" });return false}

        try {
            const Response = await fetchInfo(user, pass);

            if(!Response) {enqueueSnackbar("An error has occured! Please try again later.", { variant: "error" });return false}

            const Result = Response.result;

            if(!Result || !Result.Username || !Result.Password) {enqueueSnackbar("Username Or Password Is Incorrect! Please Try Again.", { variant: "error" });return false}

            enqueueSnackbar("Successfully Logged In!", { variant: "success" });
            setUserName(user);
            setAuth(true);
            
            setKey(user, pass);

            return true;
        } catch(err) {enqueueSnackbar("An error has occured! Please try again later.", { variant: "error" });console.log(err);return false}
    }

    return (
        <AuthorizedContext.Provider value={{auth, username, Validate, confirmReLogin}}>
            {children}
        </AuthorizedContext.Provider>
    )
}

export default Authorized;