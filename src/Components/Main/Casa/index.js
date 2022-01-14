import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Icon } from 'antd';
import { base_url, api } from '../../../services/api';
import App from '../../../App';
import { 
    Descricao,
    Endereco,
    Celulas,   
    CarouselContainer,
    Row,
    Col,
    Sobre,
    SobreIcon,
    ExtraContainer,
    ContatoContainer
} from './styles';
import banner04 from '../../../Image/banner04.jpg';
import codigo from '../../../Icon/codigo.png';
import banheiro from '../../../Icon/banheiro.png';
import chuveiro from '../../../Icon/chuveiro.png';
import garagem from '../../../Icon/garagem.png';
import quartos from '../../../Icon/quartos.png';
import localizacao from '../../../Icon/localizacao.png';
//import preco from '../../../Icon/preco.png';
import whatsapp from '../../../Icon/whatsapp.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../../css/Header.css';

function Casa () {
    const params = useParams();
    const history = useHistory();
    const { location } = history;
    const [item, setItem] = useState(location.state !== undefined? location.state.casa : null);

    useEffect(() => {
        async function getCasa() {
            const res = await api.get(`imovel/${params.id}`);           
            if(res.status === 200){
                console.log(res.data);
                setItem(res.data);
            }else{
                console.log('err',res);
            }
        }
        if(location.state === undefined){
            getCasa();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <App>   
            <div className="card principalheader">
                {item === null? 
                <div>
                    CARREGANDO...
                </div>
                :
                <>
                <div className="card-image">
                    <CarouselContainer>
                        
                            <Carousel showArrows={true} showThumbs={false} emulateTouch={true}>       
                            {item.imagens.length > 0? item.imagens.map((imagem, chave) => (
                                <div key={chave}>
                                <img src={base_url+'uploads/'+item.codigo+'/'+imagem} className="center" alt="Ilustração"/>
                                </div>
                            ))
                            :
                            <div>
                                <img src={banner04} className="center" alt="Ilustração" />
                            </div>
                            }                 
                            </Carousel>                            
                    </CarouselContainer>             
                </div>
                <Row>
                    <Descricao>
                        <Endereco>                              
                            <img className="image is-16x16" src={localizacao} alt="Localização"/>                                                                                      
                
                            <p className="texto">
                            {item.Endereco.rua}, {item.Endereco.numero}, {item.Endereco.bairro}, {item.Endereco.referencia}, {item.Endereco.cep} - {item.Endereco.cidade} {item.Endereco.estado}.                                             
                            </p> 
                        </Endereco>
                    </Descricao>
                    <Col>
                        <Descricao>
                            <Celulas tamanho={24}>                
                                <img src={codigo} alt="foto da casa"/>                                                            
                                <p><b>Código: </b> {item.codigo}</p>
                            </Celulas>
                            <Celulas tamanho={24}>                         
                                <img src={quartos} alt="foto da casa"/>                                                                
                                <p><b>Quartos:</b> {item.qtd_quartos}</p>
                            </Celulas>
                            <Celulas tamanho={24}>              
                                <img src={chuveiro} alt="foto da casa"/>                                                            
                                <p><b>Banheiros:</b>  {item.qtd_banheiros}</p>
                            </Celulas>
                            <Celulas tamanho={24}>              
                                <img src={banheiro} alt="foto da casa"/>                                                            
                                <p><b>Suítes:</b>  {item.qtd_suites}</p>
                            </Celulas>
                            <Celulas tamanho={24}>               
                                <img src={garagem} alt="foto da casa"/>                                                                
                                <p><b>Garagem:</b>  {item.qtd_garagem}</p>
                            </Celulas>                            
                        </Descricao> 
                        <Sobre>
                            <SobreIcon>
                                <Icon type="profile" />
                                <h3><b>Sobre o imóvel</b></h3>
                            </SobreIcon>
                            <p>{item.sobre}</p>
                        </Sobre>
                    </Col>
                    <Col>
                        <Descricao>
                            <div className="card">
                                <ExtraContainer>   
                                    <div>
                                        <p>{item.finalidade}</p>
                                        <p>{item.Tipoimovel.descricao}</p>
                                    </div>                                                                                                           
                                    {/* <p><b>R$</b>  {item.preco.toFixed(2).toString().replace(/\./g, ",")}</p> */}
                                    <p>  {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> 
                                </ExtraContainer>
                                <ContatoContainer>
                                    <p className="icones">
                                        <img alt="whatsapp" src={whatsapp} /> (34) 9 8827-5080
                                    </p> 
                                    <p className="icones">
                                        <Icon type="phone" theme="twoTone" /> (34) 3312-2748                                
                                    </p> 
                                </ContatoContainer>
                            </div>
                        </Descricao>
                    </Col>
                </Row>                                                                          
                </>
                }
            </div>           
        </App>
    );

}
export default Casa;