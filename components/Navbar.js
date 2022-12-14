import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Search, SearchIconWrapper, StyledInputBase } from "./NavbarHelpers";
import AndromedSvg from "./SvgIcon";
import LoginPoup from "./LoginPopup";

const ResponsiveAppBar = () => {
    // loggedIn
    const [li_anchorEl, set_li_anchorEl] = React.useState(null),
        [nli_anchorEl, set_nli_anchorEl] = React.useState(null);

    const accountSettingsMenuId = `accountSettingsMenu`,
        isAccountSettingsOpen = Boolean(li_anchorEl),
        loggedIn = false;

    const accountSettingsMenu = (
        // https://mui.com/material-ui/react-menu/#account-menu
        <Menu
            id={accountSettingsMenuId}
            anchorEl={li_anchorEl}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            keepMounted
            open={isAccountSettingsOpen}
            onClose={() => set_li_anchorEl(null)}
        >
            <MenuItem
                onClick={() => {
                    alert(`todo Account Settings Screen`);
                }}
            >
                <ManageAccountsRoundedIcon sx={{ mr: "0.3em" }} /> Account
                Settings
            </MenuItem>
            <Divider />
            <MenuItem
                onClick={() => {
                    alert(`todo Logout`);
                }}
            >
                <LogoutRoundedIcon sx={{ mr: "0.3em" }} />
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AndromedSvg sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".05rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            Andromeda
                        </Typography>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search???"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>

                        <Box
                            sx={{
                                marginLeft: "auto",
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="show 4 items in cart"
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="error">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>

                            {!loggedIn ? (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    onClick={({ currentTarget }) =>
                                        set_nli_anchorEl(currentTarget)
                                    }
                                >
                                    <LoginRoundedIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={accountSettingsMenuId}
                                    aria-haspopup="true"
                                    onClick={(event) =>
                                        set_li_anchorEl(event.currentTarget)
                                    }
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <LoginPoup
                anchorEl={nli_anchorEl}
                onClose={() => set_nli_anchorEl(null)}
            />
            {accountSettingsMenu}
        </Box>
    );
};
export default ResponsiveAppBar;
