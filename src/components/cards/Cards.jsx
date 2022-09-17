import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import OneCard from "../oneCard/OneCard";
import "./cards.css";
export default function Cards() {
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(9);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);
  const pageNumber = [];
  useEffect(() => {
    const loadData = () => {
      axios
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

  console.log("data =>", post);


  return (
    <div className="padreGrid">      
      <div className="CardGrid">
        {post && currentPost.length !== 0 ? (
          currentPost.map((data, i) => {
            return (
              <div key={i}>
                <Card
                  className="only-card"
                  style={{ border: "none", boxShadow: "none", height: "100%" }}
                >
                  <CardActionArea className="cardActionArea">
                    {!data.sprites.other.dream_world.front_default ? (
                      <Skeleton
                        sx={{ height: 400 }}
                        animation="wave"
                        variant="rectangular"
                      />
                    ) : (
                      <img
                        className="CardImage"
                        component="img"
                        alt="cards"
                        src={data.sprites.other.dream_world.front_default}
                      />
                    )}
                  </CardActionArea>
                </Card>
              </div>
            );
          })
        ) : (
          <div className="circularProgress">
            <CircularProgress />
          </div>
        )}
      </div>

      <div className="divPagination">
        <button className="botonFlecha" onClick={flechaHaciaLaIzquerda}>
          <img
            className="imgFlecha"
            src="/flechaizquierda.svg"
            alt="flecha-izquierda"
          />
        </button>

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
        <button className="botonFlecha" onClick={() => setNumber(number + 1)}>
          <img
            className="imgFlecha"
            src="/flechaderecha.svg"
            alt="flecha-derecha"
          />
        </button>
      </div>
    </div>
  );
}
