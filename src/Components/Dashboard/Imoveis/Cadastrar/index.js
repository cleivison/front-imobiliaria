import React, { useReducer, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Icon, Button, AutoComplete, Input, Alert } from 'antd';
import { TextField } from '@rmwc/textfield';
import { Checkbox } from '@rmwc/checkbox';
import { Select } from '@rmwc/select';
import { api, base_url } from '../../../../services/api';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';
import '@material/ripple/dist/mdc.ripple.css';
import 'antd/es/icon/style/css';
import 'antd/es/alert/style/css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/select/dist/mdc.select.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import { 
    Row,
    Col,
    ProprietarioContainer
} from './styles.js';
import Galeria from './Galeria';

const { Option } = AutoComplete;

function CadastrarImovel(props){
    const { state } = useLocation();
    const params = useParams();
    const history = useHistory();
   
    const [dataSource, setDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [removedList, setRemovedList] = useState([]);
    const [fileList, setFileList] = useState(state? state.imovel.imagens.map((imagem, key) => ({
        uid: key,
        name: imagem,
        status: 'done',
        url: base_url+'uploads/'+state.imovel.codigo+'/'+imagem,
    })) : []);
    const [tiposImovel, setTiposImovel] = useState([]);
    //console.log(state);
    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),
    {
        proprietario: state? state.imovel.Proprietario : '',
        rua: state? state.imovel.Endereco.rua :'',
        bairro: state? state.imovel.Endereco.bairro :'',
        cidade: state? state.imovel.Endereco.cidade :'Uberaba',
        estado: state? state.imovel.Endereco.estado :'MG',
        numero: state? state.imovel.Endereco.numero :'',
        referencia: state? state.imovel.Endereco.referencia :'',
        cep: state? state.imovel.Endereco.cep :'',
        finalidade: state? state.imovel.finalidade :'',
        tipo: state? state.imovel.Tipoimovel.id :'',
        qtd_banheiros: state? state.imovel.qtd_banheiros.toString() :'0',
        qtd_garagem: state? state.imovel.qtd_garagem.toString() :'0',
        qtd_quartos: state? state.imovel.qtd_quartos.toString() :'0',
        qtd_suites: state? state.imovel.qtd_suites.toString() :'0',
        preco: state? state.imovel.preco :'',
        sobre: state? state.imovel.sobre :'',
        destaque: state? state.imovel.destaque : false
    }
    );

    useEffect(() => {
        async function getItem(){
            const res = await api.get('imovel/'+params.id);
            
            if(res.status === 200){
                setInputs({
                    proprietario: res.data.Proprietario,
                    rua: res.data.Endereco.rua,
                    bairro: res.data.Endereco.bairro,
                    cidade: res.data.Endereco.cidade,
                    estado: res.data.Endereco.estado,
                    numero: res.data.Endereco.numero,
                    referencia: res.data.Endereco.referencia,
                    cep: res.data.Endereco.cep,
                    finalidade: res.data.finalidade,
                    tipo: res.data.Tipoimovel.id,
                    qtd_banheiros: res.data.qtd_banheiros.toString(),
                    qtd_garagem: res.data.qtd_garagem.toString(),
                    qtd_quartos: res.data.qtd_quartos.toString(),
                    qtd_suites: res.data.qtd_suites.toString(),
                    preco: res.data.preco,
                    sobre: res.data.sobre,
                    destaque: res.data.destaque
                });
                setFileList(res.data.imagens.map((imagem, key) => ({
                    uid: key,
                    name: imagem,
                    status: 'done',
                    url: base_url+'uploads/'+res.data.codigo+'/'+imagem,
                }))
                )
            }else{
                history.push('/dashboard/imoveis');
            }
        }
        if(!state && params.id !== undefined){
            getItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function getTipo(){
            const res = await api.get('tipoimovel');
            
            if(res.status === 200){                
                setTiposImovel(res.data.map((item) => {
                    return {
                        label: item.descricao,
                        value: item.id
                    };
                }));
            }else{
                history.push('/dashboard/imoveis');
            }            
        }
        getTipo();        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSearch = async () => {
        const res = await api.get(`proprietario/pers/?pesquisa=${search}`);
        if(res.status === 200) {
            setDataSource(res.data);
            setOpen(true);
        }
    }

    const onSelect = (value) => {        
        setInputs({proprietario: dataSource[value]});
    }

    const handleSearch = value => {     
        setSearch(value);
        //setInputs({proprietario: ''});        
    };

    const renderOption = (item, index) => {
        return (
          <Option key={index} text={`${item.nome} - ${item.cpf}`} onClick={() => setOpen(false)}>
            <div>
              <span>
                {`${item.nome} - ${item.cpf}`}
              </span>
            </div>
          </Option>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
            console.log(inputs)
            const imovel = {
                qtd_quartos: inputs.qtd_quartos,
                qtd_banheiros: inputs.qtd_banheiros,
                qtd_suites: inputs.qtd_suites,
                qtd_garagem: inputs.qtd_garagem,
                finalidade: inputs.finalidade,
                preco: inputs.preco.toString().replace(/,/g, "."), 
                sobre: inputs.sobre, 
                destaque: inputs.destaque,
                proprietario_id: inputs.proprietario?inputs.proprietario.id : '',
                tipoimovel_id: inputs.tipo,
                Endereco: {
                    rua: inputs.rua,
                    bairro: inputs.bairro,
                    cidade: inputs.cidade,
                    estado: inputs.estado,
                    numero: inputs.numero,
                    referencia: inputs.referencia,
                    cep: inputs.cep
                }
            }
            let res = {},
                mensagem = null;
    
            if(params.id === undefined){
                res = await api.post('imovel', imovel);
                mensagem = 'Imóvel cadastrado com sucesso!';
            }else{
                res = await api.put('imovel/'+params.id, imovel);
                mensagem = 'Imóvel atualizado com sucesso!';
            }
    
            if(res.status === 200){
                const formData = new FormData();
                
                fileList.forEach(file => {
                    //console.log('ARQUIVO', file.originFileObj);
                    formData.append('file', file.originFileObj);
                });
                //console.log('LISTA DE REMOVIDOS: ', removedList);
                formData.append('removidos', removedList);
    
                const resupload = await api.post('uploads?folder='+res.data.codigo, formData,{
                    headers: { "Content-Type": "multipart/form-data" }
                });
                if(resupload.status !== 200){
                    mensagem = 'Tarefa concluída parcialmente, ocorreu um problema com as fotos!'
                }
                history.replace('/dashboard/imoveis', {
                    mensagem
                })
            }else{
                setMessage(res.error);
                setIsLoading(false);
            }

        }  
    }

    return (
      <div>
        {message.map((msg, key) => (
            <Alert
                key={key}
                showIcon 
                message={msg.message || msg}
                type="error"
                closable
                onClose={() => {
                    let newMessages = [...message];
                    newMessages.slice(key);
                    setMessage(newMessages);
                }}
            />
        )) 
        }
         <form>
            <Row justifyContent="flex-end" style={{paddingBottom: '1rem', paddingRight: '1rem'}}>
                <Button onClick={() => history.push('/dashboard/imoveis')} type="primary" icon="rollback" size="large">Voltar</Button>
            </Row>
            <Row justifyContent="center">
                <ProprietarioContainer>
                    <AutoComplete
                    value={inputs.proprietario ? `${inputs.proprietario.nome} - ${inputs.proprietario.cpf}` : search}
                    className="global-search"
                    size="large"
                    dataSource={dataSource.map(renderOption)}
                    onSelect={onSelect}
                    onSearch={(e) => handleSearch(e)}
                    optionLabelProp="text"
                    open={open}
                    >
                        <Input
                            placeholder="NOME ou CPF"
                            onKeyUp={(e) => {
                                if(e.key === 'Enter'){
                                    onSearch();
                                }
                            }}
                            suffix={
                                <Button
                                    className="search-btn"
                                    onClick={onSearch}
                                    size="large"
                                    type="primary"
                                >
                                    <Icon type="search" />
                                </Button>
                            }
                        />
                    </AutoComplete>
                </ProprietarioContainer>
            </Row>
            <Row after>
                <Col>
                    <TextField label="Rua" value={inputs.rua} onChange={(e) => setInputs({rua: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Número" value={inputs.numero} onChange={(e) => setInputs({numero: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Bairro" value={inputs.bairro} onChange={(e) => setInputs({bairro: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Referencia" value={inputs.referencia} onChange={(e) => setInputs({referencia: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="CEP" value={inputs.cep} onChange={(e) => setInputs({cep: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Cidade"  value={inputs.cidade}  onChange={(e) => setInputs({cidade: e.target.value})} />
                </Col>  
                <Col>
                    <TextField label="Estado" value={inputs.estado} onChange={(e) => setInputs({estado: e.target.value})} />
                </Col>    
            </Row>
            <Row after>
                <Col>
                    <Select label="Finalidade" options={['alugar','comprar']} value={inputs.finalidade} onChange={(e) => setInputs({finalidade: e.target.value})} />
                </Col>
                <Col>
                    <Select label="Tipo" options={tiposImovel} value={inputs.tipo} onChange={(e) => setInputs({tipo: e.target.value})} />
                </Col>
                <Col>
                    <Select label="Quartos" options={[0,1,2,3,4,5,6,7,8,9,10]} value={inputs.qtd_quartos} onChange={(e) => setInputs({qtd_quartos: e.target.value})} />
                </Col> 
                <Col>
                    <Select label="Banheiros" options={[0,1,2,3,4,5,6,7,8,9,10]} value={inputs.qtd_banheiros} onChange={(e) => setInputs({qtd_banheiros: e.target.value})} />
                </Col> 
                <Col>
                    <Select label="Suítes" options={[0,1,2,3,4,5,6,7,8,9,10]} value={inputs.qtd_suites} onChange={(e) => setInputs({qtd_suites: e.target.value})} />
                </Col>
                <Col>
                    <Select label="Garagens" options={[0,1,2,3,4,5,6,7,8,9,10]} value={inputs.qtd_garagem} onChange={(e) => setInputs({qtd_garagem: e.target.value})} />
                </Col> 
                <Col>
                    <TextField type="number" label="Preço" value={inputs.preco} onChange={(e) => setInputs({preco: e.target.value})} />
                </Col>
                <Col>
                    <Checkbox label="Destaque" checked={inputs.destaque} onChange={(e) => setInputs({destaque: e.target.checked})} />
                </Col>
                <Col width="100" noChild>
                    <TextField
                        textarea
                        outlined
                        fullwidth
                        label="Sobre"
                        rows={3}
                        maxLength={400}
                        characterCount
                        value={inputs.sobre}
                        onChange={(e) => setInputs({sobre: e.target.value})}
                    />
                </Col>
            </Row>
            <Row>
                <Galeria filestate={[fileList, setFileList]} removeState={[removedList, setRemovedList]} />
            </Row>
            <Row>
                <Col width="100">
                    <Button 
                        loading={isLoading}
                        type="primary" 
                        htmlType="button" 
                        onClick={handleSubmit}
                        icon={params.id === undefined?'plus':'save'} 
                        size='large'>{params.id === undefined? 'Cadastrar' : 'Salvar'}
                    </Button>                                       
                </Col> 
            </Row>
        </form>
      </div>
    );
  }
export default CadastrarImovel;
