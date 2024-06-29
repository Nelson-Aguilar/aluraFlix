import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { buscar } from "../api/api"; // Ya tenemos Axios importado a través de la función buscar

const Hero = () => {
  const [videosPorCategoria, setVideosPorCategoria] = useState({});
  const videosPorCategoriaRef = useRef(videosPorCategoria);
  const [videoActual, setVideoActual] = useState(null);
  const [categorias, setCategorias] = useState([]); // Agrega estado para las categorías

  useEffect(() => {
    const fetchVideos = () => {
      buscar("/videos", (videos) => {
        const videosCategorizados = videos.reduce((acc, video) => {
          const categoria = video.category;
          if (!acc[categoria]) {
            acc[categoria] = [];
          }
          acc[categoria].push(video);
          return acc;
        }, {});
        setVideosPorCategoria(videosCategorizados);
        videosPorCategoriaRef.current = videosCategorizados;
        // Inicializar el video actual al cargar los videos
        actualizarVideoAleatorio();
      });
    };

    const fetchCategorias = () => {
      buscar("/categorias", (categoriasData) => {
        setCategorias(categoriasData);
      });
    };

    // Obtener los videos y categorías al montar el componente
    fetchVideos();
    fetchCategorias();

    // Establecer un temporizador para cambiar el video cada 6 segundos
    const intervalId = setInterval(() => {
      actualizarVideoAleatorio();
    }, 6000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const actualizarVideoAleatorio = () => {
    const categoriasKeys = Object.keys(videosPorCategoriaRef.current);
    const categoriaAleatoria = categoriasKeys[Math.floor(Math.random() * categoriasKeys.length)];
    const videosEnCategoria = videosPorCategoriaRef.current[categoriaAleatoria];
    const videoAleatorio = videosEnCategoria[Math.floor(Math.random() * videosEnCategoria.length)];
    setVideoActual(videoAleatorio);
  };

  const { id, title, linkImg, description, category } = videoActual || {};
  const categoriaActual = categorias.find((cat) => cat.name === category);

  return (
    <HeroContainer>
      <CajaTexto>
        <Titulo>{title}</Titulo>
        <Link to={`/categoria/${category}`}>
          <Styledh3 style={{ backgroundColor: categoriaActual?.color }}>
            {category} 
          </Styledh3>
        </Link>
        <Parrafo>{description}</Parrafo>
      </CajaTexto>
      <ContenedorYT>
        <Link to={`/video/${id}`}>
          <ImagenVideo
            src={linkImg}
            alt={title}
            borderColor={categoriaActual?.color}
          />
        </Link>
      </ContenedorYT>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-image: linear-gradient(236deg, rgb(0 0 16) 21%, rgb(0 0 0) 57%);
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 25px;
  transition: all 2s ease;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
`;

const CajaTexto = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  color: white;
  margin: auto;
  @media screen and (max-width: 768px) {

  }
`;

const Titulo = styled.h1`
  flex-shrink: 0;
  font-family: "Roboto";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 0.4rem;
  margin-bottom: 2rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 100%;
    text-align: center;
    justify-content: center;
    align-content: center;
    padding: 5%;

  }
`;

const Styledh3 = styled.h3`
  width: 98.5%;
  max-width: 50%;
  align-self: flex-start;
  padding: 1.5%;
  border-radius: 6px;
  font-family: "Roboto";
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  @media screen and (max-width: 768px) {
    font-size: 100%;
    text-align: center;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin: auto;
  
    
  }
`;

const Parrafo = styled.p`
  text-align: center;
  font-family: Roboto;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  @media screen and (max-width: 768px) {
    font-size: 100%;
    text-align: center;
    justify-content: center;
    align-content: center;  
  }
`;

const ImagenVideo = styled.img`
  width: 100%;
  border: 3px solid ${(props) => props.borderColor};
  @media screen and (max-width: 768px) {
  }
`;

const ContenedorYT = styled.div`
  display: block;
  width: 45%;
  max-width: 775px;
  margin-bottom: 2%;
  padding-right: 5%;
  @media screen and (max-width: 768px) {
  
  }
`;

export default Hero;
