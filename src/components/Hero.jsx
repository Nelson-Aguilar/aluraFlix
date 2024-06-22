import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { buscar } from "../api/api";

const Hero = () => {
  const [videosPorCategoria, setVideosPorCategoria] = useState({});
  const videosPorCategoriaRef = useRef(videosPorCategoria);
  const [videoActual, setVideoActual] = useState(null);

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

    const actualizarVideoAleatorio = () => {
      const categorias = Object.keys(videosPorCategoriaRef.current);
      const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
      const videosEnCategoria = videosPorCategoriaRef.current[categoriaAleatoria];
      const videoAleatorio = videosEnCategoria[Math.floor(Math.random() * videosEnCategoria.length)];
      setVideoActual(videoAleatorio);
    };

    // Obtener los videos al montar el componente
    fetchVideos();

    // Establecer un temporizador para cambiar el video cada 6 segundos
    const intervalId = setInterval(() => {
      actualizarVideoAleatorio();
    }, 6000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const {id, title, linkImg, description, category, color} = videoActual || {};

  return (
    <HeroContainer>
      <CajaTexto>
        <Titulo>{title}</Titulo>
        <Link to={`/categoria/${category}`}>
          <Styledh3 style={{ backgroundColor: color}}>
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
            borderColor={color}
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
  height: 111dvh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-image: linear-gradient(236deg, rgb(0 0 16) 21%, rgb(0 0 0) 57%);
  justify-content: space-between;
  padding-top: 1rem;
  transition: all 2s ease;
  @media screen and (max-width: 768px) {
    height: 100dvh;
    justify-content: center;
    align-content: center;
    width: 100%;
    flex-direction: column;
  }
`;

const CajaTexto = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  color: white;
  padding: 0 2.8rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const Titulo = styled.h1`
  flex-shrink: 0;
  font-family: "Roboto";
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 0.4rem;
  margin-bottom: 2rem;
  text-align: justify;

  @media screen and (max-width: 768px) {
    /* display: none; */
    font-size: 3rem;
  }
`;

const Styledh3 = styled.h3`
  width: 100%;
  max-width: 30rem;
  align-self: flex-start;
  padding: 0.5rem;
  margin-bottom: 2rem;
  margin-left:4.5rem;
  border-radius: 6px;
  font-family: "Roboto";
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 2.6rem;
    text-align: center;
  }
`;

const Parrafo = styled.p`
  text-align: justify;
  font-family: Roboto;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 0rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ImagenVideo = styled.img`
  width: 91%;
  border: 3px solid ${(props) => props.borderColor};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ContenedorYT = styled.div`
  display: block;
  width: 100%;
  max-width: 775px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default Hero;
