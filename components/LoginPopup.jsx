import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { Grid, Link, TextField, Typography } from "@mui/material";

import uc from "../styles/utils.module.css";
import AuthForms from "./AuthForms";

export default function LoginPoup(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <Popover
            id="login-popover"
            open={Boolean(props.anchorEl)}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Box sx={{ width: 444, maxWidth: `444px`, p: 2 }}>
                <AuthForms />
            </Box>
        </Popover>
    );
}
