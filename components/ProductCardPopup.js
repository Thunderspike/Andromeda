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

import { ProductCardBody } from "./ProductCard";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function ProductCardPopup(props) {
    const { id, name, detail } = props.card,
        { imageList, features } = detail;

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
                id={id}
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
                <Box sx={{ maxWidth: 375, p: 1 }}>
                    <Typography sx={{ px: 1, lineHeight: "1.05" }} variant="h6">
                        {name}
                    </Typography>
                    <Box sx={{ width: 350, flexGrow: 1, paddingTop: 0 }}>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {imageList.map((imageId, index) => (
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
                            steps={imageList.length}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={
                                        activeStep === imageList.length - 1
                                    }
                                >
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
                                </Button>
                            }
                        />
                    </Box>
                    <Box sx={{ px: 2, py: 1.5 }}>
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <ProductCardBody
                            card={props.card}
                            displayTitle={false}
                        />
                    </Box>
                </Box>
            </Popover>
        </div>
    );
}
