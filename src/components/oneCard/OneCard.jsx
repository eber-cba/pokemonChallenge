import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";
import { gsap } from "gsap";
import "./oneCard.css";
import { ButtonGroup } from "@mui/material";

export default function OneCard({ nombre }) {
  const [poke, setPoke] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenPoke, setIsHiddenPoke] = useState(false);

  const [open, setOpen] = useState(false);

  const [searchPokemon, setSearchPokemon] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchPokemon === "") {
      alert("NOOOO!!!! QUE TOCASTE? no podes buscar algo vacio...");
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
        .then((res) => {
          setPoke(res.data);
          setOpen(true);
          setSearchPokemon("");
        })
        .catch((err) => {
          Swal.fire({
            title: "Oops...",
            text: "ESE POKEMON NO EXISTE",
            background: `#fff url(https://www.carteltec.com/wp-content/uploads/2021/08/Este-Pokemon-es-el-unico-que-no-tiene-debilidades.jpg)
            no-repeat 
              `,
            padding: "3em",
            color: "red",
            backdrop: `
            rgba(0,0,123,0.4)
            no-repeat     `,
          });
          console.log("error=>", { err });
        });
    }
  };

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then((res) => {
      setPoke(res.data);
      setOpen(true);
    });
  }, [nombre]);

  const Timeline = gsap.timeline({
    defaults: { ease: "elastic.out(1, 0.3)" },
  });

  useEffect(() => {
    const pokebola = document.querySelectorAll(".pokebola");

    Timeline.from(pokebola, {
      duration: 4.5,
      y: -300,
      scale: 0,
    });
  }, [poke]);

 

  const mostrarCard = () => {
    setIsHidden(false);
    setIsHiddenPoke(true);
    backGroundCard();
  };
  const handleClose = () => {
    setOpen(false);
    setPoke([]);
    setIsHidden(true);
  };
  let card = document.querySelector(".card");

  const backGroundCard = () => {
    if (poke) {
      if (
        poke.types[0].type.name === "grass" ||
        poke.types[0].type.name === "bug"
      ) {
        card.classList.add("greenCard");
        card.classList.remove("redCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
      } else if (poke.types[0].type.name === "electric") {
        card.classList.add("yelowCard");
        card.classList.remove("greenCard");
        card.classList.remove("blueCard");
        card.classList.remove("redCard");
        card.classList.remove("normalCard");
      } else if (poke.types[0].type.name === "water") {
        card.classList.add("blueCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("redCard");
        card.classList.remove("normalCard");
      } else if (poke.types[0].type.name === "fire") {
        card.classList.add("redCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
      } else if (poke.types[0].type.name === "poison") {
        card.classList.add("poisonCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
        card.classList.remove("redCard");
      } else if (poke.types[0].type.name === "fighting") {
        card.classList.add("fightingCard");
        card.classList.remove("poisonCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
        card.classList.remove("redCard");
      } else if (poke.types[0].type.name === "psychic") {
        card.classList.add("psychicCard");
        card.classList.remove("fighting");
        card.classList.remove("poisonCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
        card.classList.remove("redCard");
      } else if (poke.types[0].type.name === "fairy") {
        card.classList.add("fairyCard");
        card.classList.remove("psychicCard");
        card.classList.remove("fightingCard");
        card.classList.remove("poisonCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
        card.classList.remove("redCard");
      } else if (poke.types[0].type.name === "rock") {
        card.classList.add("rockCard");
        card.classList.remove("fairyCard");
        card.classList.remove("psychicCard");
        card.classList.remove("fightingCard");
        card.classList.remove("poisonCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
        card.classList.remove("redCard");
      } else if (poke.types[0].type.name === "gosth") {
        card.classList.add("gosthCard");
        card.classList.remove("fairyCard");
        card.classList.remove("psychicCard");
        card.classList.remove("fightingCard");
        card.classList.remove("poisonCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
        card.classList.remove("redCard");
      } else if (poke.types[0].type.name === "ground") {
        card.classList.add("groundCard");
        card.classList.remove("gosth");
        card.classList.remove("fairyCard");
        card.classList.remove("psychicCard");
        card.classList.remove("fightingCard");
        card.classList.remove("poisonCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("normalCard");
        card.classList.remove("redCard");
      } else {
        card.classList.add("normalCard");
        card.classList.remove("greenCard");
        card.classList.remove("yelowCard");
        card.classList.remove("blueCard");
        card.classList.remove("redCard");
      }
    }
  };
  return (
    <div className="buscador">
      <form onSubmit={handleSubmit}>
        <Button className="botonConsultar" type="submit">
          Consultar
        </Button>
        <input
          style={{ textTransform: "lowercase" }}
          value={searchPokemon}
          placeholder="Buscar pokem??n"
          onChange={(e) => setSearchPokemon(e.target.value.toLowerCase())}
        />
      </form>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          className="backdrop"
        >
          <div
            hidden={!isHidden ? isHiddenPoke : null}
            onClick={mostrarCard}
            className="pokebola"
          >
            <div className="poke//_box">
              <div className="pokeball">
                <div className="pokeball__button"></div>
              </div>
            </div>
          </div>
          <div hidden={isHidden}>
            <div class="container">
              <div class="card front">
                <div className="nombre">
                  <p>{poke.name}</p>
                </div>
                <CardMedia
                  className="imgOneCard"
                  component="img"
                  image={
                    poke.length === 0
                      ? null
                      : poke.sprites.other.dream_world.front_default
                  }
                />

                <div className="tipo">
                  {poke.length === 0
                    ? null
                    : poke.types.map((tipo) => {
                        return <Chip label={tipo.type.name} />;
                      })}
                </div>
              </div>
              <div className="card back">
                <div className="datos">
                  <div>
                    <p>Altura: {poke.height}</p>
                  </div>
                  <Divider sx={{ bgcolor: "black" }} />
                  <p>Experiencia base: {poke.base_experience}</p>
                  <Divider sx={{ bgcolor: "black" }} />
                  <p>peso: {poke.weight}</p>
                  <Divider sx={{ bgcolor: "black" }} />
                  <div className="habilidades">
                    <label>
                      Habiliades:
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                      >
                        {poke.length === 0
                          ? null
                          : poke.abilities.map((habilidad) => {
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
                <button onClick={handleClose} className="btn">
                  Salir
                </button>
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
    </div>
  );
}
//https://www.carteltec.com/wp-content/uploads/2021/08/Este-Pokemon-es-el-unico-que-no-tiene-debilidades.jpg
