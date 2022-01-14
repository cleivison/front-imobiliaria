import React, { useReducer, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Button, Alert } from 'antd';
import { TextField } from '@rmwc/textfield';
import { api } from '../../../../services/api';
import 'antd/es/alert/style/css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import { 
    Row,
    Col
} from './styles.js';

function CadastrarProprietario(props){
    const { state } = useLocation();
    const params = useParams();
    const history = useHistory();
   
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),
    {
        nome: state? state.proprietario.nome : '',
        cpf: state? state.proprietario.cpf : '',
        rg: state? state.proprietario.rg : '',
        dataNascimento: state? state.proprietario.dataNascimento : '',
        rua: state? state.proprietario.Endereco.rua :'',
        bairro: state? state.proprietario.Endereco.bairro :'',
        cidade: state? state.proprietario.Endereco.cidade :'Uberaba',
        estado: state? state.proprietario.Endereco.estado :'MG',
        numero: state? state.proprietario.Endereco.numero :'',
        referencia: state? state.proprietario.Endereco.referencia :'',
        cep: state? state.proprietario.Endereco.cep :'',
        telefone: state? state.proprietario.Endereco.telefone :''
    }
    );
    let dateFormated = new Date(inputs.dataNascimento);
    // console.log('DATA INPUT:', inputs.dataNascimento);
    // console.log('DIA:', dateFormated.getUTCDate().toString().padStart(2, '0'));
    // console.log('MES:', (dateFormated.getUTCMonth()+1).toString().padStart(2, '0'));
    // console.log('ANO:', dateFormated.getUTCFullYear().toString());
    dateFormated = `${
        dateFormated.getUTCFullYear()
                    .toString()
    }-${(dateFormated.getUTCMonth()+1)
                    .toString()
                    .padStart(2, '0')
    }-${dateFormated.getUTCDate()
                    .toString()
                    .padStart(2, '0')
    }`;
    //console.log('DATA FORMATED:', dateFormated);
    useEffect(() => {
        async function getItem(){
            const res = await api.get('proprietario/'+params.id);
            
            if(res.status === 200){
                setInputs({
                    nome: res.data.nome,
                    cpf: res.data.cpf,
                    rg: res.data.rg,
                    dataNascimento: res.data.dataNascimento,
                    rua: res.data.Endereco.rua,
                    bairro: res.data.Endereco.bairro,
                    cidade: res.data.Endereco.cidade,
                    estado: res.data.Endereco.estado,
                    numero: res.data.Endereco.numero,
                    referencia: res.data.Endereco.referencia,
                    cep: res.data.Endereco.cep,
                    telefone: res.data.Endereco.telefone
                });
            }else{
                history.push('/dashboard/proprietarios');
            }
        }
        if(!state && params.id !== undefined){
            getItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
        
            const proprietario = {
                nome: inputs.nome,
                cpf: inputs.cpf,
                rg: inputs.rg,
                dataNascimento: inputs.dataNascimento,
                Endereco: {
                    rua: inputs.rua,
                    bairro: inputs.bairro,
                    cidade: inputs.cidade,
                    estado: inputs.estado,
                    numero: inputs.numero,
                    referencia: inputs.referencia,
                    cep: inputs.cep,
                    telefone: inputs.telefone
                }
            }
            let res = {},
                mensagem = null;
    
            if(params.id === undefined){
                res = await api.post('proprietario', proprietario);
                mensagem = 'Proprietário cadastrado com sucesso!';
            }else{
                res = await api.put('proprietario/'+params.id, proprietario);
                mensagem = 'Proprietário atualizado com sucesso!';
            }
    
            if(res.status === 200){
                history.replace('/dashboard/proprietarios', {
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
                <Button onClick={() => history.push('/dashboard/proprietarios')} type="primary" icon="rollback" size="large">Voltar</Button>
            </Row>
            <Row>
                <Col>
                    <TextField label="Nome" value={inputs.nome} onChange={(e) => setInputs({nome: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="CPF" value={inputs.cpf} onChange={(e) => setInputs({cpf: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="RG" value={inputs.rg} onChange={(e) => setInputs({rg: e.target.value})} />
                </Col>
                <Col>
                    <TextField 
                    label="Data de nascimento" 
                    type="date" 
                    value={dateFormated} 
                    onChange={(e) => {
                        console.log('data nascimento:',e.target.value);
                        setInputs({dataNascimento: e.target.value});
                    }} 
                    />
                </Col>
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
                <Col>
                    <TextField label="Telefone" value={inputs.telefone} onChange={(e) => setInputs({telefone: e.target.value})} />
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
export default CadastrarProprietario;
