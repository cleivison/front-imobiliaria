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

function CadastrarTipoImovel(props){
    const { state } = useLocation();
    const params = useParams();
    const history = useHistory();
   
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),
    {
        descricao: state? state.tipoimovel.descricao :'',
    }
    );

    useEffect(() => {
        async function getItem(){
            const res = await api.get('tipoimovel/'+params.id);
            
            if(res.status === 200){
                setInputs({
                    descricao: res.data.descricao
                });
            }else{
                history.push('/dashboard/tipoimovel');
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
            const tipoimovel = {
                descricao: inputs.descricao
            }
            let res = {},
                mensagem = null;

            if(params.id === undefined){
                res = await api.post('tipoimovel', tipoimovel);
                mensagem = 'Tipo de Imóvel cadastrado com sucesso!';
            }else{
                res = await api.put('tipoimovel/'+params.id, tipoimovel);
                mensagem = 'Tipo de Imóvel atualizado com sucesso!';
            }

            if(res.status === 200){
                history.replace('/dashboard/tipoimovel', {
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
                <Button onClick={() => history.push('/dashboard/tipoimovel')} type="primary" icon="rollback" size="large">Voltar</Button>
            </Row>
            <Row>
                <Col>
                    <TextField label="Descrição" value={inputs.descricao} onChange={(e) => setInputs({descricao: e.target.value})} />
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
export default CadastrarTipoImovel;
