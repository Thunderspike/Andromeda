import * as React from "react";

import {
    Box,
    Button,
    Collapse,
    Grid,
    IconButton,
    List,
    ListItem,
    Link,
    ListItemText,
    TextField,
    Typography,
    Grow,
    Paper,
    Fade,
    Slide,
    Zoom,
    Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import uc from "../styles/utils.module.css";
import { p_postData } from "../utils/utils";
import { authEndpoint, middleware } from "../utils/gloabls";

const textStyle = {
    background: `linear-gradient(to right, #007FFF, #0059B2)`,
    backgroundClip: `text`,
    WebkitTextFillColor: `transparent`,
    fontWeight: 800,
    fontSize: `clamp(1.5rem, 1.7rem, 2rem)`,
    lineHeight: 1.1142857142857143,
    ml: 1,
    py: 1,
};

const longAnimationDuration = 500;

const wsRegex = /\s/,
    passwordRegex = /([a-zA-Z]\d)+|(\d[a-zA-Z]+)/;

export default function AuthForms(props) {
    // goes from true to false, then back to true
    const [isLogin, setIsLogin] = React.useState(true);
    const [toggleIn, setToggleIn] = React.useState(true);

    return (
        <Box>
            {isLogin ? (
                <LoginForm
                    goToSignup={() => setToggleIn(false)}
                    animationState={toggleIn}
                    animationComplete={() => {
                        setToggleIn(true);
                        setIsLogin(false);
                    }}
                />
            ) : (
                <SignUpForm
                    animationState={toggleIn}
                    animationComplete={() => {
                        setToggleIn(true);
                        setIsLogin(true);
                    }}
                    goToLogin={() => setToggleIn(false)}
                />
            )}
        </Box>
    );
}

const LoginForm = React.forwardRef(
    ({ goToSignup, animationState, animationComplete }: any, ref) => {
        const [loginId, setLoginId] = React.useState("");
        const [password, setPassword] = React.useState("");
        const [submitDisable, setSubmitDisable] = React.useState(true);
        const [isLoading, setIsLoading] = React.useState(false);
        const [invalidLogin, setInvalidLogin] = React.useState(false);
        const [invalidLoginMsg, setInvalidLoginMsg] = React.useState("");

        const loginInputRef = React.useRef(null);
        const focusLogin = () => loginInputRef.current.focus();

        React.useEffect(() => {
            if (!loginId || !password) setSubmitDisable(true);
            else setSubmitDisable(false);
        }, [loginId, password]);

        const handleLogin = async (event) => {
            event.preventDefault();

            const form = new FormData(event.currentTarget),
                data = {
                    login_id: form.get("login_id"),
                    password: form.get("password"),
                };

            setInvalidLogin(false);
            setIsLoading(true);

            const method = `login`;

            try {
                await p_postData({
                    url: `${middleware}/${authEndpoint}/${method}`,
                    data,
                });
            } catch ({ message }) {
                setInvalidLogin(true);
                setInvalidLoginMsg(message);
                setLoginId("");
                setPassword("");

                focusLogin();
            }

            setIsLoading(false);
        };

        return (
            <Box ref={ref}>
                <Fade in={animationState}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" sx={textStyle}>
                            Log In
                        </Typography>
                        <Grow in={invalidLogin}>
                            <Alert
                                icon={false}
                                severity="warning"
                                variant="outlined"
                                sx={{ fontSize: "1em", py: 0 }}
                            >
                                {invalidLoginMsg}
                            </Alert>
                        </Grow>
                    </Box>
                </Fade>
                <Box component="form" noValidate onSubmit={handleLogin}>
                    <Collapse
                        orientation="horizontal"
                        in={animationState}
                        onExited={() => {
                            loginInputRef;
                            setInvalidLogin(false); // hide
                            animationComplete();
                        }}
                        timeout={longAnimationDuration}
                    >
                        <TextField
                            id="login_id"
                            name="login_id"
                            value={loginId}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setLoginId(event.target.value)}
                            autoFocus
                            inputRef={loginInputRef}
                            label="Email Address or Username"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            id="login_password"
                            name="password"
                            value={password}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(event.target.value)}
                            label="Password"
                            fullWidth
                            margin="normal"
                        />
                    </Collapse>
                    <Fade in={animationState}>
                        <Box>
                            <LoadingButton
                                type="submit"
                                disabled={submitDisable}
                                loading={isLoading}
                                variant="contained"
                                fullWidth
                                sx={{ my: 2 }}
                            >
                                Sign In
                            </LoadingButton>

                            <Box className={uc.flex_between}>
                                <Link
                                    component="button"
                                    type="button" // otherwise, these are treated as type "submits" by default???
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    onClick={goToSignup}
                                >
                                    Don't have an account? Sign Up
                                </Link>
                            </Box>
                        </Box>
                    </Fade>
                </Box>
            </Box>
        );
    }
);

const SignUpForm = React.forwardRef(
    ({ goToLogin, animationState, animationComplete }: any, ref) => {
        const [username, setUsername] = React.useState("");
        const [email, setEmail] = React.useState("");
        const [password, setPassword] = React.useState("");

        const [submitDisable, setSubmitDisable] = React.useState(true);
        const [isLoading, setIsLoading] = React.useState(false);

        const usernameRef = React.useRef(null);
        const emailRef = React.useRef(null);
        const passwordRef = React.useRef(null);
        const focusUsername = () => usernameRef.current.focus();
        const focusEmail = () => emailRef.current.focus();
        const focusPassword = () => passwordRef.current.focus();

        const handleSignUp = async (event) => {
            event.preventDefault();

            const form = new FormData(event.currentTarget),
                data = {
                    login_id: form.get("login_id"),
                    password: form.get("password"),
                };
        };

        return (
            <Box ref={ref}>
                <Fade in={animationState}>
                    <Typography variant="h6" sx={textStyle}>
                        Sign Up
                    </Typography>
                </Fade>
                <Box
                    component="form"
                    onSubmit={handleSignUp}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Slide
                        direction="right"
                        in={animationState}
                        onExited={animationComplete}
                        timeout={longAnimationDuration}
                    >
                        <Box>
                            <TextField
                                id="signup_username"
                                name="username"
                                value={username}
                                // prettier-ignore
                                onChange={({ target }) => setUsername(target.value)}
                                ref={usernameRef}
                                inputRef={usernameRef}
                                label="Username"
                                autoFocus
                                fullWidth
                                margin="normal"
                                autoComplete="username"
                            />
                            <TextField
                                id="signup_email"
                                name="email"
                                value={email}
                                // prettier-ignore
                                onChange={({ target }) => setEmail(target.value)}
                                ref={emailRef}
                                inputMode="email"
                                label="Email Address"
                                required
                                autoComplete="email"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                id="signup_password"
                                name="password"
                                type="password"
                                value={password}
                                // prettier-ignore
                                onChange={({ target }) => setPassword(target.value)}
                                ref={passwordRef}
                                label="Password"
                                required
                                autoComplete="password"
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    </Slide>
                    <Fade in={animationState}>
                        <Box>
                            <LoadingButton
                                type="submit"
                                disabled={submitDisable}
                                loading={isLoading}
                                variant="contained"
                                fullWidth
                                sx={{ my: 2 }}
                            >
                                Sign Up
                            </LoadingButton>
                            <Link
                                component="button"
                                type="button"
                                variant="body2"
                                onClick={goToLogin}
                            >
                                Already have an account? Log in
                            </Link>
                        </Box>
                    </Fade>
                </Box>
            </Box>
        );
    }
);
