import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActions,
  CircularProgress,
} from "@mui/material";

function ArtListView(props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

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
      <Box sx={{ height: "380px", position: "relative" }}>
        {!imageLoaded && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <CardMedia
          component="img"
          image={props.imgSrc}
          alt={props.title}
          onLoad={handleImageLoad}
          sx={{
            height: "100%",
            display: imageLoaded ? "block" : "none",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
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
        </Box>
      </CardContent>
      <CardActions sx={{ marginTop: "auto", marginLeft: "2%" }}>
        <Typography variant="body1">Artist: {props.artistName}</Typography>
      </CardActions>
    </Card>
  );
}

export default ArtListView;
