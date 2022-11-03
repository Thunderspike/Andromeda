import * as React from "react";

// Next
import Image from "next/image";

// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Link from "@mui/material/Link";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

// Icons
import StarIcon from "@mui/icons-material/Star";

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
        boxShadow: theme.shadows[2],
        fontSize: `1em`,
    },
}));
const activeLinks = false;

export function ProductCardBody({ card, displayTitle = true }) {
    const { rating, brand, name, price, freeShipping } = card,
        { name: brandName, id: brandId } = brand,
        { value: ratingVal, numRatings } = rating;

    const ratingPrecision = 0.1;
    const ratingTextVal = `Rated at ${ratingVal} stars`;

    const [compareChecked, sCompareChecked] = React.useState(false);
    const [numItemsInCart, sNumItemsInCart] = React.useState(0);
    const maxItemsInInventory = 30;

    return (
        <>
            <Box className={uc.flex_beteen_center}>
                {isNaN(ratingVal) ? (
                    <div></div>
                ) : (
                    <LightTooltip title={ratingTextVal} placement="top-start">
                        <div
                            style={{
                                maxWidth: `fit-content`,
                                display: `flex`,
                            }}
                        >
                            <Rating
                                name="item-rating"
                                value={Number(ratingVal)}
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
                )}
                <a
                    href={
                        activeLinks
                            ? `https://www.newegg.com/ASUS/BrandStore/${brandId}`
                            : ``
                    }
                >
                    <img
                        src={`https://c1.neweggimages.com/Brandimage_70x28/${brandId}.gif`}
                        title={brandName}
                        alt={brandName}
                    />
                </a>
            </Box>
            {displayTitle && (
                <Typography variant="h6" sx={{ lineHeight: "1.05" }}>
                    {name}
                </Typography>
            )}
            <Box
                sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    alignItems: `flex-end`,
                }}
            >
                <Box>
                    {price.was && (
                        <Typography
                            variant="caption"
                            sx={{
                                textDecoration: "line-through",
                                color: "text.secondary",
                                lineHeight: 0,
                            }}
                        >
                            {price.currency}
                            {price.was}
                        </Typography>
                    )}
                    {!price.is ? (
                        <div></div>
                    ) : (
                        <Box sx={{ mt: 0.5 }}>
                            {!price.is.includes(`.`) ? (
                                <Typography variant="h5">
                                    {price.currency}
                                    {price.is}
                                </Typography>
                            ) : (
                                <div style={{ display: "flex" }}>
                                    <Typography variant="h5">
                                        {price.currency}
                                        {price.is.slice(
                                            0,
                                            price.is.indexOf(`.`)
                                        )}
                                    </Typography>
                                    <sup>
                                        {price.is.slice(
                                            price.is.indexOf(`.`),
                                            price.is.length
                                        )}
                                    </sup>
                                </div>
                            )}
                        </Box>
                    )}
                </Box>
                {freeShipping && price.is && (
                    <Typography variant="body2" sx={{ mt: 0.2 }}>
                        Free Shipping
                    </Typography>
                )}
            </Box>
            <Divider variant="fullWidth" sx={{ mt: 1 }} />
            <Box className={uc.flex_beteen_center} sx={{ mt: 1.5 }}>
                <LightTooltip
                    title="Add product to your shopping cart"
                    placement="top-start"
                >
                    <div>
                        <CheckoutButton
                            numItemsInCart={numItemsInCart}
                            onSingleAdd={() => {
                                sNumItemsInCart(
                                    Math.min(
                                        maxItemsInInventory,
                                        numItemsInCart + 1
                                    )
                                );
                            }}
                            onSinlgeRemove={() => {
                                sNumItemsInCart(
                                    Math.max(0, numItemsInCart - 1)
                                );
                            }}
                            onSelectNum={(val) => {
                                sNumItemsInCart(val);
                            }}
                            maxItemsInInventory={maxItemsInInventory}
                        />
                    </div>
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
                            sx={{ mr: 0.5 }}
                            label="Compare"
                        />
                    </FormGroup>
                </LightTooltip>
            </Box>
        </>
    );
}

export default function ProductCard(props) {
    const { id, detail } = props.card,
        imageId = detail?.imageList[0] ?? id;

    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{ px: 1, pt: 1 }}
            >
                <LightTooltip title="Click to view view product details">
                    <Box sx={{ cursor: "pointer" }}>
                        <Image
                            src={`https://c1.neweggimages.com/ProductImage/${imageId}.jpg`}
                            layout="responsive"
                            width="600"
                            height="450"
                            objectFit="cover"
                        />
                    </Box>
                </LightTooltip>
            </Box>
            <ProductCardPopup
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                card={props.card}
            />
            <CardContent sx={{ pt: ".25em", paddingBottom: "1em !important" }}>
                <ProductCardBody card={props.card} />
            </CardContent>
        </Card>
    );
}
