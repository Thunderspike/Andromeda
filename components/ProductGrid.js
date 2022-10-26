import * as React from "react";

// MUI
import Grid from "@mui/material/Grid";

// Project Components
import ProductCard from "./ProductCard";

export default function ProductGrid({ cards }) {
    return (
        <>
            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid item key={card.id} lg={4} md={6}>
                        <ProductCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
