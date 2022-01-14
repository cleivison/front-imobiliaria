import React, { useReducer, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';
import '../../../css/Home.css';
import { base_url, api } from '../../../services/api';
//import {Carousel} from 'react-responsive-carousel';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Radio, Input, Button, Pagination, Icon } from 'antd';
import Image from "react-graceful-image";
import 'antd/es/radio/style/css';
import 'antd/es/input/style/css';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import { 
    Row, 
    Col,
    Descricao,
    Endereco,
    Celulas,   
    CarouselContainer,
    RowPesquisa,
    ColPesquisa,
    Detalhes    
} from './styles';
import banner04 from '../../../Image/banner04.jpg';
import codigo from '../../../Icon/codigo.png';
import chuveiro from '../../../Icon/chuveiro.png';
import garagem from '../../../Icon/garagem.png';
import quartos from '../../../Icon/quartos.png';
import localizacao from '../../../Icon/localizacao.png';
import preco from '../../../Icon/preco.png';
import Titulos from '../Titulos';
const { Search } = Input;

function Home (props){
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    
    const [entities, setEntities] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            response: [],
            nome: '',
            active: true, 
            pagination: {current: 1, pageSize: 10, total: 0},
            requesting: false,
            dados: {}
        }
    );
    const [tipo, setTipo] = useState([]);
    const [casasDestaque, setCasasDestaque] = useState([]);
    const [checker, setChecker] = useState(props.alugar?'alugar':props.comprar?'comprar':'');
    const [buscar, setBuscar] = useState("");
    const [loading, setLoading] = useState(true);
    const refs = useRef([]);

    const onSubmit = data =>{
        setEntities({
            dados: data,
            pagination: {...entities.pagination, current: 1},
            requesting: !entities.requesting
        });      
    }
    
    useEffect(() => {

        async function apiRequest() {         
            let link = ""; 
            link += 'pesquisa='+buscar+'&';
            link += 'qtd_quartos='+(entities.dados.quartos || '0')+'&';
            link += 'qtd_garagem='+(entities.dados.garagem || '0')+'&';
            link += 'qtd_banheiros='+(entities.dados.chuveiros || '0')+'&';
            link += 'tipo='+(entities.dados.tipo || '')+'&';
            link += 'finalidade='+checker+'&';
            link += 'page='+entities.pagination.current+'&';
            link += 'pageSize='+entities.pagination.pageSize;
            setLoading(true);
            const res = await api.get(`imovel/pers?`+link);            
            if(res.status === 200){
                setEntities({
                    response : res.data.imoveis,
                    pagination: {...entities.pagination, total: res.data.count}
                });
            }else{
                console.log('err',res);
            }  
            setLoading(false);
        }

        apiRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entities.requesting]); 

    useEffect(() => {
        async function getTipos() {
            const res = await api.get('tipoimovel');            
            if(res.status === 200){
                setTipo(res.data);
            }else{
                console.log('err',res);
            }  
        }
        getTipos();
    }, []);

    useEffect(() => {
        async function getCasasDestaque() {
            const res = await api.get('imovel/destaques');            
            if(res.status === 200){    
                setCasasDestaque(res.data.imoveis);
            }else{
                console.log('err',res);
            }  
        }
        getCasasDestaque();
    }, []);

    return (       
            <div>
                <Titulos props={casasDestaque}/>
                <div className="card principalhome">
                <form onSubmit={handleSubmit(onSubmit)}>
                <RowPesquisa type="flex" justify="space-between" >
                    <ColPesquisa >
                        {!props.alugar && !props.comprar &&
                        <Radio.Group onChange={(current) => setChecker(current.target.value)} value={checker} buttonStyle="solid">
                            <Radio.Button value="">TODOS</Radio.Button>
                            <Radio.Button value="alugar">ALUGAR</Radio.Button>
                            <Radio.Button value="comprar">COMPRAR</Radio.Button>   
                        </Radio.Group>
                        }
                        {(props.alugar || props.comprar) &&
                        <Radio.Group value={checker} buttonStyle="solid">
                            {props.alugar && <Radio.Button value="alugar">ALUGAR</Radio.Button>}
                            {props.comprar && <Radio.Button value="comprar">COMPRAR</Radio.Button>}  
                        </Radio.Group>
                        }
                    </ColPesquisa>
                    
                    <ColPesquisa > 
                        <div className="select">
                            <select defaultValue="" name="tipo" ref={register}>
                                <option value="">Tipo</option>
                                {tipo.map((item, key) => (
                                    <option key={key} value={item.id}>{item.descricao}</option>
                                ))}
                            </select>
                        </div>
                    </ColPesquisa>
                    <ColPesquisa > 
                        <div className="select">
                            <select defaultValue="0" name="chuveiros" ref={register}>
                                <option value="0">Banheiros</option>
                                {Array(10).fill().map((item, key) => (
                                    <option key={key} value={key+1}>{key+1}</option>
                                ))}
                            </select>
                        </div>
                    </ColPesquisa>
                    <ColPesquisa > 
                        <div className="select">
                            <select defaultValue="0" name="garagem" ref={register}>
                                <option value="0">Garagem</option>
                                {Array(10).fill().map((item, key) => (
                                    <option key={key} value={key+1}>{key+1}</option>
                                ))}
                            </select>
                            </div>
                    </ColPesquisa>
                    <ColPesquisa > 
                        <div className="select">
                            <select defaultValue="0" name="quartos" ref={register}>
                                <option value="0">Quartos</option>
                                {Array(10).fill().map((item, key) => (
                                    <option key={key} value={key+1}>{key+1}</option>
                                ))}
                            </select>    
                        </div>          
                    </ColPesquisa>
                    <ColPesquisa > 
                        <Search 
                            placeholder="Rua, Bairro ou Codigo" 
                            onSearch={value => setBuscar(value)}
                            enterButton={
                                <Button 
                                    type="primary"  
                                    htmlType= "submit" 
                                    icon="search"

                                />
                            } 
                        />                     
                    </ColPesquisa>     
                </RowPesquisa>   
                </form>
            </div>    
            
            <div className="card principalmain">   
            {loading?
            
            <div style={{width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Icon type="loading-3-quarters" style={{fontSize: '3rem'}} spin />
            </div>
            
            :   

            <Row>
            {entities.response.map((item, key) => {
                console.log('item ', item)                                    
                refs.current[key] = React.createRef();             
                if(item.Contratoimovels.finalizado !== false)         
                return (
                <Col key={key}>                
                <div className="card">
                    <div className="card-image">
                        <CarouselContainer>
                            {/* <Carousel showArrows={true} showThumbs={false} emulateTouch={true}>   
                                {item.imagens.length > 0? item.imagens.map((imagem, chave) => (
                                    <div key={chave}>
                                    <img 
                                    src={base_url+'uploads/'+item.codigo+'/'+imagem} 
                                    className="center"
                                    alt={imagem}
                                    />
                                    </div>
                                ))
                                :
                                <div>
                                <img src={banner04} className="center" alt="Ilustração" />
                                </div>
                                }                                                    
                            </Carousel>                             */}
                            <div>
                            {item.imagens.length > 0? 
                                // <img 
                                // src={base_url+'uploads/'+item.codigo+'/'+item.imagens[0]} 
                                // alt={`Imóvel código: ${item.codigo}`}
                                // />
                                <Image
                                    src={base_url+'uploads/'+item.codigo+'/'+item.imagens[0]} 
                                    alt={`Imóvel código: ${item.codigo}`}
                                    retry={{ count: 10, delay: 2 }}
                                />
                                :
                                <img src={banner04} alt="Ilustração" /> 
                            }
                            </div>
                        </CarouselContainer>             
                    </div>
                    <Descricao>
                            <Celulas tamanho={24}>                
                                <img src={codigo} alt="Código"/>                                                            
                                <p><b>Código: </b> {item.codigo}</p>
                            </Celulas>
                            <Celulas tamanho={24}>                         
                                <img src={quartos} alt="Quartos"/>                                                                
                                <p><b>Quartos:</b> {item.qtd_quartos}</p>
                            </Celulas>
                            <Celulas tamanho={24}>              
                                <img src={chuveiro} alt="Banheiros"/>                                                            
                                <p><b>Banheiros:</b>  {item.qtd_banheiros}</p>
                            </Celulas>
                            <Celulas tamanho={24}>               
                                <img src={garagem} alt="Garagem"/>                                                                
                                <p><b>Garagem:</b>  {item.qtd_garagem}</p>
                            </Celulas>
                            <Celulas tamanho={24}>             
                                <img src={preco} alt="Preço"/>                                                                
                                {/* <p><b>R$</b>  {item.preco.toFixed(2).toString().replace(/\./g, ",")}</p> */}
                                <p>  {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>                               
                            </Celulas>
                    </Descricao>                                                                           
                    <Descricao>
                        <Endereco>                              
                            <img className="image is-16x16" src={localizacao} alt="Localização"/>                                                                                      
                
                            <p className="texto">
                            {item.Endereco.rua}, {item.Endereco.numero}, {item.Endereco.bairro}, {item.Endereco.referencia}, {item.Endereco.cep} - {item.Endereco.cidade} {item.Endereco.estado}.                                             
                            </p> 
                        </Endereco>
                        <Detalhes>                     
                            <button className="button is-primary" onClick={() => history.push(`casa/${item.codigo}`,{
                                casa: item
                            })}>Detalhes</button>
                        </Detalhes>
                    </Descricao>
                </div>
                
                </Col>    
                
            )})}
            </Row>

            }   
            <Row>
                <Pagination 
                    style={{marginBottom: '1rem'}}
                    {...entities.pagination} 
                    onChange={(page) => setEntities({
                        pagination: {...entities.pagination,current: page},
                        requesting: !entities.requesting
                    })} 
                />
            </Row>        
            </div>                      
        </div>                                                        
           
    );
};

export default Home;