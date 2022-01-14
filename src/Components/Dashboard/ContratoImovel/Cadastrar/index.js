import React, { useReducer, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Icon, Button, AutoComplete, Input, Alert } from 'antd';
import { TextField } from '@rmwc/textfield';
import { Checkbox } from '@rmwc/checkbox';
import { api } from '../../../../services/api';
import 'antd/es/icon/style/css';
import 'antd/es/alert/style/css';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';
import '@material/ripple/dist/mdc.ripple.css';
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
    ContratoImovelContainer,    
} from './styles.js';

const { Option } = AutoComplete;

function CadastrarContratoimovel(props){
    const { state } = useLocation();
    const params = useParams();
    const history = useHistory();
   
    const [dataSource, setDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);    
    //console.log(state);

    const [dataSource2, setDataSource2] = useState([]);
    const [search2, setSearch2] = useState('');
    const [open2, setOpen2] = useState(false);

    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),
    {
        data_inicio: state? state.contratoimovel.data_inicio : '',        
        qtd_recibo: state? state.contratoimovel.qtd_recibo.toString() :'0',
        valor_aluguel: state? state.contratoimovel.valor_aluguel.toString() :'0',
        debito_anterior: state? state.contratoimovel.debito_anterior.toString() :'0',
        observacao: state? state.contratoimovel.observacao: '',
        imovel: state? state.contratoimovel.Imovel: '',
        inquilino: state? state.contratoimovel.Inquilino:'', 
        finalizado: state? state.contratoimovel.finalizado:'',              
    }
    );

    let dateInicioFormated = new Date(inputs.data_inicio);   
    dateInicioFormated = `${
        dateInicioFormated.getUTCFullYear()
                    .toString()
    }-${(dateInicioFormated.getUTCMonth()+1)
                    .toString()
                    .padStart(2, '0')
    }-${dateInicioFormated.getUTCDate()
                    .toString()
                    .padStart(2, '0')
    }`;    

    useEffect(() => {
        async function getItem(){
            const res = await api.get('contratoimovel/'+params.id);           
            if(res.status === 200){
                setInputs({
                    data_inicio: res.data.data_inicio,                    
                    qtd_recibo: res.data.qtd_recibo.toString(),
                    valor_aluguel: res.data.valor_aluguel.toString(),       
                    debito_anterior: res.data.debito_anterior.toString(),
                    observacao: res.data.observacao,
                    imovel: res.data.Imovel,
                    inquilino: res.data.Inquilino,
                    finalizado: res.data.finalizado
                });                
            }else{
                history.push('/dashboard/contratoimovel');
            }
        }
        if(!state && params.id !== undefined){
            getItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSearch = async () => {
        const res = await api.get(`inquilino/pers/?pesquisa=${search}`);
        if(res.status === 200) {
            setDataSource(res.data);
            setOpen(true);
        }
    }

    const onSelect = (value) => {
        setInputs({inquilino: dataSource[value]});
    }

    const handleSearch = value => {
        setSearch(value);
        setInputs({inquilino: ''});
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

    const onSearch2 = async () => {       
        const res = await api.get(`imovel/pers2/?pesquisa=${search2}`);
        if(res.status === 200) {
            setDataSource2(res.data);
            setOpen2(true);            
        }
    }

    const onSelect2 = (value) => {
        setInputs({imovel: dataSource2[value]});
    }

    const handleSearch2 = value => {
        setSearch2(value);
        setInputs({imovel: ''});
    };

    const renderOption2 = (item, index) => {
        return (
          <Option key={index} text={`${item.Endereco.rua} - ${item.Endereco.bairro} - ${item.Endereco.numero}`} onClick={() => setOpen2(false)}>
            <div>
              <span>
                {`${item.Endereco.rua} - ${item.Endereco.bairro} - ${item.Endereco.numero}`}
              </span>
            </div>
          </Option>
        );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
        
            const contratoimovel = {

                data_inicio: inputs.data_inicio,                
                qtd_recibo: inputs.qtd_recibo,
                valor_aluguel: inputs.valor_aluguel,  
                debito_anterior: inputs.debito_anterior,
                observacao: inputs.observacao,     
                imovel_id: inputs.imovel?inputs.imovel.id : '',
                inquilino_id: inputs.inquilino?inputs.inquilino.id : '', 
                finalizado: inputs.finalizado,                  
            }            
            let res = {},
                mensagem = null;
    
            if(params.id === undefined){
                res = await api.post('contratoimovel', contratoimovel);                
                mensagem = 'Contrato Imovel cadastrado com sucesso!';                
                var data = new Date(res.data.data_inicio); 
                let dia = data.getUTCDate();          
                for(let i = 0; i < res.data.qtd_recibo; i++){
                    
                    let data_n = new Date(data);
                    let d = data_n.getMonth();                                                      
                    for (let c = 0;d === data_n.getMonth(); c++){
                        
                        data_n.setMonth(data_n.getMonth()+1);  
                        data_n.setDate(dia - c);                                                
                        if(d+2 === data_n.getMonth()){
                            data_n.setDate(dia);                        
                            data_n.setMonth(data.getMonth());                                                                             
                        }                                                                              
                    }   
                                                             
                    let recibocontrato = {
                        data_vencimento: data_n,
                        parcela: i+1, 
                        valor_aluguel: res.data.valor_aluguel,
                        dias_aluguel: 0,
                        multa_cl2: 0,
                        multa_cl24: 0,
                        taxa_agua: 0,
                        taxa_luz: 0,
                        servicos_adicionais: 0,
                        iptu_tcrsu: 0,
                        debito_anterior: res.data.debito_anterior,
                        pagamento: 0,
                        desconto: 0,
                        observacoes: "",
                        desconto_ir: 0,
                        liquido: 0,
                        debito: 0,
                        contratoimovel_id: res.data.id
                    }                      
                    data = data_n;
                    res.data.debito_anterior = 0;
                    //console.log('Data: '+ data_n.getUTCDate() +' '+ (data_n.getUTCMonth()+1) +' '+ data_n.getUTCFullYear());                    
                    await api.post('recibocontrato', recibocontrato);                    
                }
            }else{
                res = await api.put('contratoimovel/'+params.id, contratoimovel);                
                mensagem = 'Contrato Imovel atualizado com sucesso!';                
            }
    
            if(res.status === 200){                
                history.replace('/dashboard/contratoimovel', {
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
                <Button onClick={() => history.push('/dashboard/contratoimovel')} type="primary" icon="rollback" size="large">Voltar</Button>
            </Row>
            <Row justifyContent="space-evenly">
                <ContratoImovelContainer>
                    <AutoComplete
                    value={inputs.inquilino? `${inputs.inquilino.nome} - ${inputs.inquilino.cpf}` : search}
                    className="global-search"
                    size="large"
                    dataSource={dataSource.map(renderOption)}
                    onSelect={onSelect}
                    onSearch={handleSearch}
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
                </ContratoImovelContainer>   
                <ContratoImovelContainer>              
                <AutoComplete
                    value={inputs.imovel? `${inputs.imovel.Endereco.rua} - ${inputs.imovel.Endereco.bairro} - ${inputs.imovel.Endereco.numero}` : search2}
                    className="global-search"
                    size="large"
                    dataSource={dataSource2.map(renderOption2)}
                    onSelect={onSelect2}
                    onSearch={handleSearch2}
                    optionLabelProp="text"
                    open={open2}
                    >
                        <Input
                            placeholder="RUA ou BAIRRO"
                            onKeyUp={(e) => {
                                if(e.key === 'Enter'){
                                    onSearch2();
                                }
                            }}
                            suffix={
                                <Button
                                    className="search-btn"
                                    onClick={onSearch2}
                                    size="large"
                                    type="primary"
                                >
                                    <Icon type="search" />
                                </Button>
                            }
                        />
                    </AutoComplete>
                </ContratoImovelContainer>                
            </Row>
            
            <Row after>
                <Col>
                    <TextField 
                    label="Data do inicio" 
                    type="date" 
                    value={dateInicioFormated} 
                    onChange={(e) => {                        
                        setInputs({data_inicio: e.target.value});
                    }} 
                    />
                </Col>
                <Col>
                    <TextField label="Qtd. Recibos" value={inputs.qtd_recibo} onChange={(e) => setInputs({qtd_recibo: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Valor aluguel" value={inputs.valor_aluguel} onChange={(e) => setInputs({valor_aluguel: e.target.value})} />
                </Col>    
                <Col>
                    <TextField label="Débitos anteriores" value={inputs.debito_anterior} onChange={(e) => setInputs({debito_anterior: e.target.value})} />
                </Col>
                <Col>
                    <Checkbox label="Finalizado" checked={inputs.finalizado} onChange={(e) => setInputs({finalizado: e.target.checked})} />
                </Col>
                <Col width="100" noChild>
                    <TextField
                        textarea
                        outlined
                        fullwidth
                        label="Observações"
                        rows={3}
                        maxLength={400}
                        characterCount
                        value={inputs.observacao}
                        onChange={(e) => setInputs({observacao: e.target.value})}
                    />
                </Col>                
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
export default CadastrarContratoimovel;
