import * as React from "react";

// MUI
import Grid from "@mui/material/Grid";

// Project Components
import ProductCard from "./ProductCard";

export default function ProductGrid({ cards }) {
    return (
        <>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {cards.map((card) => (
                    <Grid
                        item
                        key={card.id}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        sx={{ display: `flex`, justifyContent: `center` }}
                    >
                        <ProductCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
