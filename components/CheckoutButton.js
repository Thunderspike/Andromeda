import * as React from "react";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";
import {
    Badge,
    FormControl,
    Input,
    InputLabel,
    Menu,
    Popover,
    Select,
} from "@mui/material";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { indigo } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import uc from "../styles/utils.module.css";
import { MedicalInformationOutlined } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: indigo[500],
        color: theme.palette.background.paper,
    },
}));

const PulsingLabel = styled(InputLabel)(() => ({
        "&.pulse": {
            animation: `text-pulse 1500ms infinite ease-out`,
        },
    })),
    PulsingSelectBorder = styled(Select)(() => ({
        "&.pulse .MuiOutlinedInput-notchedOutline": {
            animation: `border-pulse 1500ms infinite ease-out`,
        },
        "&.pulse .MuiSelect-select": {
            animation: `text-pulse 1500ms infinite ease-out`,
        },
    }));

class Pulser {
    constructor() {
        this.timeOutId = null;
        this.animationTime = 1500;
    }
    applyTo(els = []) {
        console.log(els);
        if (this.timeOutId) clearTimeout(this.timeOutId);
        els.forEach((el) => el?.classList?.add(`pulse`));
        this.timeOutId = setTimeout(() => {
            els.forEach((el) => el?.classList?.remove(`pulse`));
        }, this.animationTime);
    }
}

const pulser = new Pulser();

export default function CheckoutButton(props) {
    const [qCheckoutEl, sQCheckoutEl] = React.useState(null);
    const [numItemsInCart, sNumItemsInCart] = React.useState(0);
    const maxItemsInInventory = 30;

    // useRef vs createRef: https://blog.logrocket.com/complete-guide-react-refs/
    const selectRef = React.useRef(null),
        labelRef = React.useRef(null);

    return (
        <div style={{ margin: "1em" }}>
            <StyledBadge
                badgeContent={numItemsInCart}
                invisible={!!qCheckoutEl}
            >
                <Button
                    variant="contained"
                    onClick={(e) => sQCheckoutEl(e.currentTarget)}
                    endIcon={<AddShoppingCartIcon />}
                >
                    Add to Cart
                </Button>
            </StyledBadge>
            <Popover
                open={!!qCheckoutEl}
                anchorEl={qCheckoutEl}
                onClose={() => sQCheckoutEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Paper
                    component="form"
                    sx={{
                        m: 0,
                        pl: 1,
                        display: "flex",
                        alignItems: "center",
                        width: "max-content",
                    }}
                >
                    <IconButton
                        color="primary"
                        aria-label="Add 1 of these items to"
                        onClick={() => {
                            pulser.applyTo([
                                selectRef.current,
                                labelRef.curren,
                            ]);
                            sNumItemsInCart(
                                Math.min(
                                    maxItemsInInventory,
                                    numItemsInCart + 1
                                )
                            );
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                    <IconButton
                        color="primary"
                        aria-label="Remove 1 of these items from cart"
                        onClick={() => {
                            pulser.applyTo([
                                selectRef.current,
                                labelRef.curren,
                            ]);
                            sNumItemsInCart(Math.max(0, numItemsInCart - 1));
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                    <FormControl sx={{ m: 1.25, minWidth: 75 }} size="small">
                        <PulsingLabel ref={labelRef}>number</PulsingLabel>
                        <PulsingSelectBorder
                            value={numItemsInCart}
                            label="number"
                            className="hello"
                            ref={selectRef}
                            onChange={(event) => {
                                sNumItemsInCart(event.target.value);
                            }}
                            MenuProps={{ sx: { maxHeight: `350px` } }}
                        >
                            {Array(maxItemsInInventory + 1)
                                .fill("")
                                .map((_, index) => (
                                    <MenuItem key={index} value={index}>
                                        {index}
                                    </MenuItem>
                                ))}
                        </PulsingSelectBorder>
                    </FormControl>
                </Paper>
            </Popover>
        </div>
    );
}
