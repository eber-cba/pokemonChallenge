import axios from "axios";
import React, { useState, useEffect } from "react";
import img from "../../assets/769px-Pokebola-pokeball-png-0.png"
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { ButtonGroup } from "@mui/material";

import OneCard from "../oneCard/OneCard";
import "./cards.css";
export default function Cards() {
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(9);
  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);
  const [nombre, setNombre] = useState();
  const pageNumber = [];
  useEffect(() => {
    const loadData = async () => {
      await axios
        .get("https://pokeapi.co/api/v2/pokemon?offset=10&limit=100")
        .then((resp) => {
          for (let i = 0; i < resp.data.results.length; i++) {
            axios.get(resp.data.results[i].url).then((result) => {
              setPost((prevArray) => [...prevArray, result.data]);
            });
          }
        });
    };
    loadData();
  }, []);

  for (let i = 1; i <= Math.ceil(post.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };
  const flechaHaciaLaIzquerda = () => {
    if (number - 1 === 0) {
      setNumber(number);
    } else {
      setNumber(number - 1);
    }
  };

  return (
    <div>
      <OneCard nombre={nombre} />
      <div className="padreGrid">
        <div className="CardGrid">
          {currentPost.map((data, i) => {
            return (
              <div key={i}>
                <div class="container">
                  <div
                    style={{
                      background: `${
                        data.types[0].type.name === "bug" ||
                        data.types[0].type.name === "grass"
                          ? "linear-gradient(to right, #11998e, #38ef7d)"
                          : data.types[0].type.name === "electric"
                          ? "radial-gradient(circle, rgba(254,255,37,1) 28%, rgba(247,195,122,1) 100%)"
                          : data.types[0].type.name === "water"
                          ? "linear-gradient( 179.4deg,  rgba(33,150,243,1) 1.8%, rgba(22,255,245,0.60) 97.1% )"
                          : data.types[0].type.name === "fire"
                          ? "linear-gradient(to right, #ffcc33, #ffb347)"
                          : data.types[0].type.name === "normal"
                          ? "linear-gradient(to right, #2c3e50, #4ca1af)"
                          : data.types[0].type.name === "poison"
                          ? " linear-gradient( 126.3deg,  rgba(30,2,83,1) 32.2%, rgba(198,55,160,0.46) 109.2% )"
                          : data.types[0].type.name === "ground"
                          ? "radial-gradient( circle farthest-corner at 10% 20%,  rgba(147,67,67,1) 0%, rgba(111,27,27,1) 90% )"
                          : data.types[0].type.name === "fighting"
                          ? "linear-gradient( 65.9deg,  rgba(85,228,224,1) 5.5%, rgba(75,68,224,0.74) 54.2%, rgba(64,198,238,1) 55.2%, rgba(177,36,224,1) 98.4% )"
                          : data.types[0].type.name === "psychic"
                          ? " linear-gradient( 97.3deg,  rgba(25,50,70,0.81) 10.7%, rgba(155,65,25,0.72) 39.5%, rgba(255,192,0,0.81) 69.7% )"
                          : data.types[0].type.name === "fairy"
                          ? "radial-gradient( circle farthest-corner at 10% 20%,  rgba(62,133,238,1) 1.1%, rgba(227,137,240,1) 43.7%, rgba(243,193,124,1) 89.7% )"
                          : data.types[0].type.name === "rock"
                          ? "radial-gradient( circle farthest-corner at 10% 20%,  rgba(100,130,159,1) 0%, rgba(103,56,96,1) 90% )"
                          : data.types[0].type.name === "ghost"
                          ? "linear-gradient( 109.6deg,  rgba(15,2,2,1) 11.2%, rgba(36,163,190,1) 91.1% )"
                          : "black"
                      }`,
                    }}
                    className="card front"
                  >
                    <div className="nombre">
                      <p>{data.name}</p>
                    </div>
                    <CardMedia
                      className="imgOneCard"
                      component="img"
                      image={
                        data.length === 0
                          ? null
                          : data.sprites.other.dream_world.front_default
                      }
                    />

                    <div className="tipo">
                      {data.length === 0
                        ? null
                        : data.types.map((tipo) => {
                            return <Chip label={tipo.type.name} />;
                          })}
                    </div>
                  </div>
                  <div
                    style={{
                      background: `linear-gradient( 76.9deg,  rgba(255,90,90,1) 27.2%, rgba(130,5,255,1) 79.9% )`,
                    }}
                    className="card back"
                  >
                    <div className="datos">
                      <div>
                        <p>Altura: {data.height}</p>
                      </div>
                      <Divider sx={{ bgcolor: "black" }} />
                      <p>Experiencia base: {data.base_experience}</p>
                      <Divider sx={{ bgcolor: "black" }} />
                      <p>peso: {data.weight}</p>
                      <Divider sx={{ bgcolor: "black" }} />
                      <div className="habilidades">
                        <label>
                          Habiliades:
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                          >
                            {data.length === 0
                              ? null
                              : data.abilities.map((habilidad) => {
                                  return (
                                    <Button className="buttonsHabilidad">
                                      {habilidad.ability.name}
                                    </Button>
                                  );
                                })}
                          </ButtonGroup>
                        </label>
                      </div>
                    </div>

                    <button onClick={() => setNombre(data.name)} className="btn">
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="divPagination">
          <img
            onClick={flechaHaciaLaIzquerda}
            className="imgFlecha"
            src={img}
            alt="flecha-izquierda"
          />

          {pageNumber.map((Elem, i) => {
            return (
              <div className="botonesNumeros" key={i}>
                <button
                  className="botones-numeros"
                  onClick={() => ChangePage(Elem)}
                >
                  {Elem}
                </button>
              </div>
            );
          })}

          <img
            onClick={() => setNumber(number + 1)}
            className="imgFlecha"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png"
            alt="flecha-derecha"
          />
        </div>
      </div>
    </div>
  );
}
