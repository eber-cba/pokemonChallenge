import axios from "axios";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OneCard() {
  const [poke, setPoke] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchPokemon, setSearchPokemon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
      .then((res) => {
        setPoke(res.data);
      });
  };

  console.log("poke", poke);
  return (
    <div>
      <form onClick={handleSubmit}>
        <Button type="submit" onClick={handleOpen}>
          Buscar
        </Button>
        <input
          value={searchPokemon}
          placeholder="Buscar pokemón"
          onChange={(e) => setSearchPokemon(e.target.value)}
        />
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
               image={poke.sprites.other.dream_world.front_default}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {poke.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 
                  <br />
                  Altura: {poke.height}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
