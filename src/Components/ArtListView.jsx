import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

function ArtListView(props) {
  return (
    <Card
      sx={{
        height: 650,
        display: "flex",
        flexDirection: "column",
        margin: "10%",
        background: "#F1F1F1",
      }}
    >
      <CardMedia
        component="img"
        image={props.imgSrc}
        alt={props.title}
        sx={{ height: "380px", display: "flex", flexDirection: "column" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ marginTop: "5%" }}>
            Artist: {props.artistName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ArtListView;
