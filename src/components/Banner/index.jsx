import styled from "styled-components";
import banner from "../../assets/img/background_main.png";

const BannerContainer = styled.div`
  background: url(${banner}) no-repeat center / cover;
  padding: 4.5rem 4rem;
  display: flex;
  align-items: flex-end;
  height: 55vh;
  gap: 4rem;
  position: relative;
  justify-content: center;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    padding: 2rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    padding: 2rem 0.8rem;
  }
`;

const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  gap: 2.5rem;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    gap: 1rem;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    gap: 0.5rem;
    background: rgba(83, 88, 93, 0.7);
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
`;

const BannerTitle = styled.h2`
  text-align: center;
  font-size: 2.6rem;
  margin-bottom: 0;
  @media screen and (min-width: 0) and (max-width: 1023px) {
    text-align: center;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 1.2rem;
    margin: 0;
  }
`;

const BannerP = styled.p`
  font-size: 1.2rem;
  margin-top: 0;
  text-align: center;
  @media screen and (min-width: 425px) and (max-width: 767px) {
    font-size: 1rem;
    margin: 0;
  }
  @media screen and (min-width: 0) and (max-width: 424px) {
    font-size: 0.6rem;
    margin: 0;
  }
`;

function Banner() {
  return (
    <section>
      <BannerContainer>
        <BannerText>
          <BannerTitle>Aluraflix</BannerTitle>
          <BannerP>
            Nuestra página web es tu destino para una amplia variedad de videos
            relacionados con programación, gestión e innovación, diseño UX,
            movilidad y más. Te proporcionamos valioso contenido para aprender,
            inspirarte y mantenerte actualizado en el mundo de la tecnología y
            la creatividad. Explora nuestra plataforma y únete a una comunidad
            apasionada por el aprendizaje continuo. ¡Bienvenido a un espacio
            donde la curiosidad y la innovación se encuentran
          </BannerP>
        </BannerText>
      </BannerContainer>
    </section>
  );
}

export default Banner;
