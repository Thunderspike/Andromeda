import * as React from "react";

// Next
import Image from "next/image";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Typography from "@mui/material/Typography";

// Styles
import { useTheme } from "@mui/material/styles";

// prettier-ignore
const images = [
    `14-126-512-02`, `14-126-512-V27`, `14-126-512-V90`, `14-126-512-V35`, `14-126-512-V31`, `14-126-512-V34`, `14-126-512-V26`, `14-126-512-V81`, `14-126-512-V36`, `14-126-512-V33`, `14-126-512-V32`, `14-126-512-V30`, `14-126-512-V29`, `14-126-512-V28`
];
// prettier-ignore
const features = [
    `8GB 256-Bit GDDR6X`, `OC mode: 1815MHz (Boost Clock)`, 
    `Gaming mode: 1785 MHz (Boost Clock)`, `2 x HDMI 3 x DisplayPort 1.4a`,
    `6144 CUDA Cores`, `PCI Express 4.0 x16`
];
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function ProductCardPopup(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleStepChange = (step) => setActiveStep(step);

    return (
        <div>
            <Popover
                id={props.id}
                open={Boolean(props.anchorEl)}
                anchorEl={props.anchorEl}
                onClose={props.onClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Box sx={{ maxWidth: 700, p: 1 }}>
                    <Typography sx={{ px: 1, pt: 1 }} variant="h6">
                        ASUS TUF Gaming GeForce RTX 3070 Ti 8GB GDDR6X PCI
                        Express 4.0 Video Card TUF-RTX3070TI-O8G-GAMING
                    </Typography>
                    <Box sx={{ display: `flex`, justifyContent: `center` }}>
                        <Box sx={{ width: 350, flexGrow: 1 }}>
                            <AutoPlaySwipeableViews
                                axis={
                                    theme.direction === "rtl"
                                        ? "x-reverse"
                                        : "x"
                                }
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                {images.map((imageId, index) => (
                                    <div key={imageId}>
                                        {Math.abs(activeStep - index) <= 2 ? (
                                            <Image
                                                src={`https://c1.neweggimages.com/ProductImage/${imageId}.jpg`}
                                                layout="responsive"
                                                width="600"
                                                height="450"
                                                objectFit="cover"
                                            />
                                        ) : null}
                                    </div>
                                ))}
                            </AutoPlaySwipeableViews>
                            <MobileStepper
                                variant="text"
                                steps={images.length}
                                position="static"
                                activeStep={activeStep}
                                nextButton={
                                    <Button
                                        size="small"
                                        onClick={handleNext}
                                        disabled={
                                            activeStep === images.length - 1
                                        }
                                    >
                                        {/* Next */}
                                        {theme.direction === "rtl" ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </Button>
                                }
                                backButton={
                                    <Button
                                        size="small"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                    >
                                        {theme.direction === "rtl" ? (
                                            <KeyboardArrowRight />
                                        ) : (
                                            <KeyboardArrowLeft />
                                        )}
                                        {/* Back */}
                                    </Button>
                                }
                            />
                        </Box>
                        <Box sx={{ px: 2, py: 1.5 }}>
                            {features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
}
