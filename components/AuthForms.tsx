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
    FormHelperText,
    FormHelperTextProps,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import uc from "../styles/utils.module.css";
import { onlyCharsAndNums, p_postData } from "../utils/utils";
import { authEndpoint, middleware } from "../utils/gloabls";

import { deepOrange } from "@mui/material/colors";

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

export default function AuthForms(props) {
    // goes from true to false, then back to true
    const [isLogin, setIsLogin] = React.useState(false);
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
        const [invalidLoginMsg, setInvalidLoginMsg] = React.useState("");

        const loginInputRef = React.useRef(null);
        const focusLogin = () => loginInputRef.current.focus();

        React.useEffect(() => {
            if (!loginId || !password) setSubmitDisable(true);
            else setSubmitDisable(false);
        }, [loginId, password]);

        const handleLogin = async (event) => {
            event.preventDefault();

            setInvalidLoginMsg("");
            setIsLoading(true);

            const form = new FormData(event.currentTarget),
                data = {
                    login_id: form.get("login_id"),
                    password: form.get("password"),
                },
                method = `login`;

            try {
                await p_postData({
                    url: `${middleware}/${authEndpoint}/${method}`,
                    data,
                });
                console.log(`Continue here`);
            } catch ({ message }) {
                setInvalidLoginMsg(message);
                setLoginId("");
                setPassword("");

                focusLogin();
            }

            setIsLoading(false);
        };

        const finishHidingLogin = () => {
            // hide invalid login message if exists on switch screen
            setInvalidLoginMsg("");
            animationComplete();
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
                        <Grow in={Boolean(invalidLoginMsg.length)}>
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
                        onExited={finishHidingLogin}
                        timeout={longAnimationDuration}
                    >
                        <TextField
                            id="login_id"
                            name="login_id"
                            value={loginId}
                            onChange={({ target }) => setLoginId(target.value)}
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
                            onChange={({ target }) => setPassword(target.value)}
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
        const [username, setUsername] = React.useState("Thunderspike");
        const [uNameInvalid, setUnameInvalid] = React.useState(false);
        const [email, setEmail] = React.useState("pol.ajazi@yahoo.com");
        const [emailInvalid, setEmailInvalid] = React.useState(false);
        const [password, setPassword] = React.useState("123");
        const [passInvalid, setPassInvalid] = React.useState(false);

        const [submitDisable, setSubmitDisable] = React.useState(true);
        const [isLoading, setIsLoading] = React.useState(false);

        const [suResponse, setSuResponse] = React.useState(null);

        const fieldRefs = React.useRef({
            username: null,
            email: null,
            password: null,
        });

        const handleSignUp = async (event) => {
            event.preventDefault();

            const data = { username, email, password },
                method = `signUp`;

            try {
                const results = await p_postData({
                    url: `${middleware}/${authEndpoint}/${method}`,
                    data,
                });
                // keep it going
                console.log({ results });
            } catch (response) {
                // if response.message - something different
                setSuResponse({ error: response?.messages });
                const errors = response?.messages;
                if (errors?.length) {
                    const invalidUnameO = errors.find(
                            ({ key }) => key == `username`
                        ),
                        invalidEmailO = errors.find(
                            ({ key }) => key == `email`
                        ),
                        invalidPassO = errors.find(
                            ({ key }) => key == `password`
                        );

                    if (invalidUnameO) fieldRefs.current.username.focus();
                    else if (!invalidUnameO && invalidEmailO)
                        fieldRefs.current.email.focus();
                    else if (!invalidUnameO && !invalidEmailO && invalidPassO)
                        fieldRefs.current.password.focus();
                }
            }

            setIsLoading(false);
        };

        React.useEffect(
            () => {
                let signupDisabled =
                    !email ||
                    !password ||
                    (suResponse?.error &&
                        (uNameInvalid || emailInvalid || passInvalid));
                setSubmitDisable(signupDisabled);

                const invalidUnameO = suResponse?.error?.find(
                        ({ key }) => key == `username`
                    ),
                    invalidEmailO = suResponse?.error.find(
                        ({ key }) => key == `email`
                    ),
                    invalidPassO = suResponse?.error.find(
                        ({ key }) => key == `password`
                    );

                if (invalidUnameO != null)
                    setUnameInvalid(username == invalidUnameO.value);
                if (invalidEmailO != null)
                    setEmailInvalid(email == invalidEmailO.value);
                if (invalidPassO != null)
                    setPassInvalid(
                        password &&
                            (!onlyCharsAndNums(password) ||
                                password.length < 4 ||
                                password.length > 30)
                    );
            },
            // prettier-ignore
            [ username, email, password, uNameInvalid, emailInvalid, passInvalid, suResponse ]
        );

        const getErrProps = ({ isInvalid, key }) => {
            // prettier-ignore
            const errProps: {
                color:  'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
                helperText: React.ReactNode
                FormHelperTextProps: Partial<FormHelperTextProps>
            } = {
                color: "info",
                helperText: "",
                FormHelperTextProps: {
                    sx: { color: deepOrange[500] },
                    variant: "outlined",
                }
            };

            if (isInvalid) {
                errProps[`color`] = `warning`;
                errProps.helperText =
                    suResponse?.error?.find((errO) => errO.key == key)
                        ?.message ?? "";
            }

            return errProps;
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
                        onExited={animationComplete} // ignore error, Slide does have onExited
                        timeout={longAnimationDuration}
                    >
                        <Box>
                            <TextField
                                id="signup_username"
                                name="username"
                                value={username}
                                onChange={({ target }) =>
                                    setUsername(target.value)
                                }
                                inputRef={(el) =>
                                    (fieldRefs.current.username = el)
                                }
                                label="Username"
                                autoFocus
                                autoComplete="username"
                                margin="normal"
                                fullWidth
                                {...getErrProps({
                                    isInvalid: uNameInvalid,
                                    key: `username`,
                                })}
                            />
                            <TextField
                                id="signup_email"
                                name="email"
                                value={email}
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                                inputRef={(el) =>
                                    (fieldRefs.current.email = el)
                                }
                                inputMode="email"
                                label="Email Address"
                                required
                                autoComplete="email"
                                margin="normal"
                                fullWidth
                                {...getErrProps({
                                    isInvalid: emailInvalid,
                                    key: `email`,
                                })}
                            />
                            <TextField
                                id="signup_password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                inputRef={(el) =>
                                    (fieldRefs.current.password = el)
                                }
                                label="Password"
                                required
                                autoComplete="password"
                                fullWidth
                                margin="normal"
                                {...getErrProps({
                                    isInvalid: passInvalid,
                                    key: `password`,
                                })}
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
