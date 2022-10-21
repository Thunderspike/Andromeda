import * as React from "react";
import { SvgIcon as MuiSvgIcon, styled } from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
    name: "MopeimIcon",
    shouldForwardProp: (prop) => prop !== "fill",
})(() => ({
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2.25px",
}));

SvgIcon.defaultProps = {
    viewBox: "0 0 60 60",
    focusable: "false",
    "aria-hidden": "true",
};

const Andromeda = (props) => {
    return (
        <SvgIcon {...props}>
            <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M47.6777 47.6777C37.9146 57.4408 22.0854 57.4408 12.3223 47.6777C2.55922 37.9146 2.55922 22.0854 12.3223 12.3223C22.0854 2.55922 37.9146 2.55922 47.6777 12.3223C57.4408 22.0854 57.4408 37.9146 47.6777 47.6777Z"
                    stroke="white"
                    strokeWidth="7"
                />
                <path
                    d="M47.9706 43C38.598 51.0667 23.402 51.0667 14.0294 43C4.65687 34.9334 4.65684 19.1166 14.0294 11.05C23.402 2.98337 37.6274 3.93337 47 12C56.3726 20.0666 57.3432 34.9334 47.9706 43Z"
                    stroke="white"
                    strokeWidth="7"
                />
            </svg>
        </SvgIcon>
    );
};
export default Andromeda;
