import * as React from "react";

// Next
import Image from "next/image";

// MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

// Icons
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Styles
import { styled } from "@mui/material/styles";
import uc from "../styles/utils.module.css";

// Project Components
import ProductCardPopup from "./ProductCardPopup";
import CheckoutButton from "./CheckoutButton";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));
const activeLinks = false;

// prettier-ignore
let cards = ["14-126-512-02", "14-932-496-S0", "14-932-491-01", "14-137-709-V0", "14-930-057-06", "14-932-416-03"];
// prettier-ignore
let card = {
    id: "14-126-512-02",
    rating: {
        value: 4.61,
        numRatings: 162,
    },
    company: "ASUS",
    name: "ASUS TUF Gaming GeForce RTX 3070 Ti 8GB GDDR6X PCI Express 4.0 Video Card TUF-RTX3070TI-O8G-GAMING",
    price: {
        currency: "$",
        was: "689.99",
        is: "659.99",
    },
    freeShipping: true,
    detail: {
        ids: [
            `14-126-512-02`, `14-126-512-V27`, `14-126-512-V90`, `14-126-512-V35`, `14-126-512-V31`, `14-126-512-V34`, `14-126-512-V26`, `14-126-512-V81`, `14-126-512-V36`, `14-126-512-V33`, `14-126-512-V32`, `14-126-512-V30`, 
            `14-126-512-V29.`, `14-126-512-V28`
        ],
        features: [
            `8GB 256-Bit GDDR6X`, `OC mode: 1815MHz (Boost Clock)`, 
            `Gaming mode: 1785 MHz (Boost Clock)`, `2 x HDMI 3 x DisplayPort 1.4a`,
            `6144 CUDA Cores`, `PCI Express 4.0 x16`
        ]
    }
};

function MediaCard({ id, rating, name, price, freeShipping }) {
    const { value: ratingVal, numRatings } = rating;
    const ratingPrecision = 0.1;
    const ratingTextVal =
        (Number.isInteger(ratingVal / ratingPrecision)
            ? ratingVal
            : `${ratingVal}+`) + ` Rating`;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [compareChecked, sCompareChecked] = React.useState(false);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <div onClick={(event) => setAnchorEl(event.currentTarget)}>
                <LightTooltip
                    title="ASUS TUF Gaming GeForce RTX 3070 Ti 8GB GDDR6X PCI Express
                    4.0 Video Card TUF-RTX3070TI-O8G-GAMING"
                >
                    <CardActionArea
                        sx={{ padding: "1em", margin: "-0.5em auto" }}
                    >
                        <Image
                            src={`/graphicCards/${id}.jpg`}
                            layout="responsive"
                            width="600"
                            height="450"
                            objectFit="cover"
                        />
                    </CardActionArea>
                </LightTooltip>
                <ProductCardPopup anchorEl={anchorEl} id={id} />
            </div>
            <ProductCardPopup
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(undefined)}
                id={id}
            />
            <CardContent
                sx={{ paddingTop: 1, paddingBottom: "1em !important" }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <LightTooltip title={ratingTextVal} placement="top-start">
                        <div
                            style={{
                                maxWidth: `fit-content`,
                                display: `flex`,
                            }}
                        >
                            <Rating
                                name="item-rating"
                                value={ratingVal}
                                precision={ratingPrecision}
                                readOnly
                                getLabelText={() => ratingTextVal}
                                emptyIcon={
                                    <StarIcon
                                        style={{ opacity: 0.55 }}
                                        fontSize="inherit"
                                    />
                                }
                            />
                            <Typography sx={{ ml: 0.5, mt: 0.2 }}>
                                ({numRatings})
                            </Typography>
                        </div>
                    </LightTooltip>
                    <a
                        href={
                            activeLinks
                                ? "https://www.newegg.com/ASUS/BrandStore/ID-1315"
                                : ``
                        }
                    >
                        <img
                            src="https://c1.neweggimages.com/Brandimage_70x28/Brand1315.gif"
                            title="ASUS"
                            alt="ASUS"
                        />
                    </a>
                </Box>
                <Typography variant="h6">{name}</Typography>
                {price.was && (
                    <Typography
                        variant="caption"
                        sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                        }}
                    >
                        {price.currency}
                        {price.was}
                    </Typography>
                )}
                {!price.is.includes(`.`) ? (
                    <Typography variant="h5">
                        {price.currency}
                        {price.is}
                    </Typography>
                ) : (
                    <div style={{ display: "flex" }}>
                        <Typography variant="h5">
                            {price.currency}
                            {price.is.slice(0, price.is.indexOf(`.`))}
                        </Typography>
                        <sup>
                            {price.is.slice(
                                price.is.indexOf(`.`),
                                price.is.length
                            )}
                            <Link
                                href={
                                    activeLinks
                                        ? "https://www.newegg.com/asus-geforce-rtx-3070-ti-tuf-rtx3070ti-o8g-gaming/p/N82E16814126512?Item=N82E16814126512&buyingoptions=New"
                                        : ``
                                }
                                color="text.secondary"
                                underline="none"
                                sx={{
                                    ml: 0.5,
                                    "&:hover": { color: "primary.main" },
                                }}
                            >
                                (14 Offers)
                            </Link>
                        </sup>
                    </div>
                )}
                {freeShipping && (
                    <Typography variant="body2" sx={{ mt: 0.2 }}>
                        Free Shipping
                    </Typography>
                )}
                <Divider variant="fullWidth" sx={{ mt: 1 }} />
                <Box className={uc.flex_beteen_center} sx={{ mt: 1 }}>
                    <LightTooltip
                        title="Add product to your shopping cart!"
                        placement="top-start"
                    >
                        <Button
                            variant="contained"
                            endIcon={<AddShoppingCartIcon />}
                        >
                            Add to Cart
                        </Button>
                    </LightTooltip>
                    <LightTooltip
                        title="Toggle this checkbox alongside other products to compare their performance"
                        placement="top-start"
                    >
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={compareChecked}
                                        onChange={(e) =>
                                            sCompareChecked(e.target.checked)
                                        }
                                    />
                                }
                                label="Compare"
                            />
                        </FormGroup>
                    </LightTooltip>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function ProductGrid() {
    return (
        <>
            <CheckoutButton />
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <MediaCard {...card} />
                </Grid>
                {/* <Grid item xs={6} md={4}>
                <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={4}>
                <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={8}>
                <Item>xs=6 md=8</Item>
            </Grid> */}
            </Grid>
        </>
    );
}
