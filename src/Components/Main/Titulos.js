import React, { useEffect, useState } from 'react';
//import banner01 from '../../Image/banner01.png';
import banner02 from '../../Image/banner02.png';
import banner03 from '../../Image/banner03.png';
import banner04 from '../../Image/banner04.jpg';
import '../../css/Titulos.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from '../../services/api';

function Titulos(props) {
  const imoveis = props.props
  console.log('imoveis', imoveis)
  return (
    <div className="center">
      <Carousel showArrows={true} showThumbs={false} showStatus={false} emulateTouch={true}>
        {imoveis ?
          imoveis.map((imovel) => {
            return (
              <a href={`/casa/${imovel.codigo}`}>
                <div key={imovel.id}>
                  <img className="imgDestaque"
                    //src={imovel.imagens[0]} 
                    src={base_url + 'uploads/' + imovel.codigo + '/' + imovel.imagens[0]}
                    alt="Ilustração"
                  />
                </div>
              </a>
            )
          })
          :
          <>
            <div>
              <img src={banner02} alt="Ilustração" />
            </div>
            <div>
              <img src={banner03} alt="Ilustração" />
            </div>
            <div>
              <img src={banner04} alt="Ilustração" />
            </div>
          </>
        }
      </Carousel>
    </div>
  );
};

export default Titulos;