import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import OneCard from "../oneCard/OneCard";
import "./cards.css";
export default function Cards() {
  const [pokemons, setPokemons] = useState([]);
 

  const loadData = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=10&limit=10")
      .then((resp) => {
        for (let i = 0; i < resp.data.results.length; i++) {
          axios.get(resp.data.results[i].url).then((result) => {
            setPokemons((prevArray) => [...prevArray, result.data]);
          });
        }
      });
  };
  useEffect(loadData, []);

  
  return (
    <div>
      
      <OneCard/>
      <div className="Cards">
        {pokemons.map((pokes, i) => {
          return (
            <Card key={i} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={pokes.sprites.other.dream_world.front_default}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pokes.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    habilidad:{" "}
                    {pokes.abilities.map((habilidad) => {
                      return <>{habilidad.ability.name}</>;
                    })}
                    <br />
                    Altura: {pokes.height}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
