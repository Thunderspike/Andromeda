import * as React from "react";
import { Theme } from "@mui/material/styles";
import {
    Box,
    Button,
    Collapse,
    FormControlLabel,
    Paper,
    Switch,
} from "@mui/material";

const Icon = (props) => (
    <>
        <Box component="svg" sx={{ width: 102, height: 102, m: 1 }}>
            <Box
                component="polygon"
                sx={{
                    fill: (theme) => theme.palette.common.white,
                    stroke: (theme) =>
                        props.isLogin
                            ? theme.palette.primary.main
                            : theme.palette.warning.main,
                    strokeWidth: 2,
                }}
                points="0,100 50,00, 100,100"
            />
        </Box>
        <Box sx={{ display: `flex`, justifyContent: `flex-end` }}>
            <div>
                <Button variant="text" onClick={props.onClick}>
                    {props.isLogin ? `Next` : `Prev`}
                </Button>
            </div>
        </Box>
    </>
);

export default function Test(props) {
    const [isLogin, setIsLogin] = React.useState(true);
    const [toggleIn, setToggleIn] = React.useState(true);
    return (
        <Paper
            sx={{
                m: 1,
                width: `min-content`,
            }}
            elevation={4}
        >
            <Box
                sx={{
                    "& > :not(style)": {
                        display: "flex",
                        justifyContent: "space-around",
                        height: 120,
                        width: 250,
                    },
                }}
            >
                <Box sx={{ width: "50%" }}>
                    {isLogin ? (
                        <Collapse
                            orientation="horizontal"
                            in={toggleIn}
                            onExited={() => {
                                setToggleIn(true);
                                setIsLogin(false);
                            }}
                        >
                            <Icon
                                isLogin={isLogin}
                                onClick={() => {
                                    setToggleIn(false);
                                }}
                            />
                        </Collapse>
                    ) : (
                        <Collapse
                            orientation="horizontal"
                            in={toggleIn}
                            onExited={() => {
                                setToggleIn(true);
                                setIsLogin(true);
                            }}
                        >
                            <Icon
                                isLogin={isLogin}
                                onClick={() => setToggleIn(false)}
                            />
                        </Collapse>
                    )}
                </Box>
            </Box>
        </Paper>
    );
}
