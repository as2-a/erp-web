import { ChangeEvent, useState } from "react";
import "../SignUpStyles.css";
import logo from "../assets/logo.png";
import { Box, TextField, Button, Alert } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AuthService from "../services/Auth.service";

export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [errorSignedIn, setErrorSignedIn] = useState(false);
    const [errorSignedInMessage, setErrorSignedInMessage] = useState("");

    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        setIsFormSubmitting(true);
        setIsFormSubmitted(true);

        if (username.trim() === "" || password.trim() === "") {
            setIsFormSubmitting(false);
            setErrorSignedInMessage("Por favor, ingrese su usuario y contraseña");
            return;
        }
        const response = await AuthService.login(username, password);
        if (response && response.data) {
            setIsFormSubmitting(false);
            window.location.reload();
        } else if (response && !response.data) {
            setErrorSignedIn(true);
            setErrorSignedInMessage(response.message);
            setIsFormSubmitting(false);
        } else {
            setErrorSignedIn(true);
            setErrorSignedInMessage("Error al iniciar sesión");
            setIsFormSubmitting(false);
        }
    };

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={'100vh'}>
            <div className="card">
                <img src={logo} alt="Ferreteria Logo" style={{ maxHeight: '200px', maxWidth: '200px' }} />
                <h2>Ferreteria la Bendición</h2>
                <form className="form">
                    <div style={{ marginBottom: "1rem" }} className="username">
                        <TextField
                            onChange={handleUserChange}
                            autoComplete="off"
                            spellCheck="false"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            error={(isFormSubmitted && username.trim() === "")} />
                    </div>
                    <div style={{ marginBottom: "1rem" }} className="username">
                        <TextField
                            onChange={handlePasswordChange}
                            name="password"
                            spellCheck="false"
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            error={isFormSubmitted && password.trim() === ""} />
                    </div>
                    {errorSignedIn ?
                        (<Alert sx={{ marginBottom: '1rem' }} severity="error">{errorSignedInMessage}</Alert>) :
                                (isFormSubmitted
                                    && (username.trim() === "" || password.trim() === "")) ?
                                    (<Alert sx={{ marginBottom: '1rem' }} severity="error">Por favor ingresa tu usuario y contraseña</Alert>) : null
                    }
                    <Button disabled={isFormSubmitting} onClick={handleLogin} variant="contained" color="primary" startIcon={<LockIcon />}>
                        Inicia Sesión
                    </Button>
                </form>
            </div>
        </Box>
    );
};
