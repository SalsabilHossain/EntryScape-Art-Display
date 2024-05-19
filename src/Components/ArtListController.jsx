import React, { useEffect, useState } from "react";
import { EntryStore } from "@entryscape/entrystore-js";
import { Grid, Container, Typography } from "@mui/material";
import ArtListView from "./ArtListView";

function ArtListController() {
  const [artData, setArtData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching and Parsing the RDF/XML Data obtained from the artist Resource URI
  const getArtistName = (artistResourceURI) => {
    return fetch(artistResourceURI)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const givenName = data.querySelector("givenName").innerHTML;
        const familyName = data.querySelector("familyName")
          ? data.querySelector("familyName").innerHTML
          : "";

        return givenName + " " + familyName;
      });
  };

  const fetchArtistData = async () => {
    try {
      // Establish a connection with the EntryStore instance
      const es = new EntryStore("https://recruit.entryscape.net/store");

      // Setting the rdfType here for piece of art
      const pieceOfArtType = "http://example.com/PieceOfArt";

      // A Solr query to search for entries of type "Piece of Art"
      const pieceOfArtList = es.newSolrQuery().rdfType(pieceOfArtType).list();

      // Gets the entries from the solr query
      const entries = await pieceOfArtList.getEntries();

      // Get the projections for the entries
      const projections = await Promise.all(
        entries.map(async (result) => {
          const proj = await result._entryInfo._entry.projection({
            title: "http://purl.org/dc/terms/title",
            description: "http://purl.org/dc/terms/description",
            imgSrc: "http://xmlns.com/foaf/0.1/img",
            artist: "http://example.com/artist",
          });

          // Get the artistName using the resourceURI
          const artistName = await getArtistName(proj.artist);

          return {
            ...proj,
            artistName: artistName,
          };
        })
      );

      setArtData(projections);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", margin: "2%" }}
      >
        Artists And Their Creations
      </Typography>
      <Grid container spacing={4}>
        {artData.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ArtListView
              title={item.title}
              description={item.description}
              imgSrc={item.imgSrc}
              artistName={item.artistName}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArtListController;
