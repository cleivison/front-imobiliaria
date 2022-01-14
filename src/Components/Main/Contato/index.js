import React, { useReducer, useState } from 'react';
import { Icon, Input, Button, Alert } from 'antd';
import { api } from '../../../services/api';
import 'antd/es/alert/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/button/style/css';
import 'antd/es/input/style/css';
import {
    FormContainer,
    FormCustom
}from './styles';
const { TextArea } = Input;

function Contato () {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),{
        nome: '',
        email: '',
        mensagem: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        if(!isLoading){
            setIsLoading(true);
            const res = await api.post('enviarcontato', inputs);
    
            if(res.status === 200){
                setMessage({msg: res.data.message, type: 'success'});
            }else{
                setMessage({msg: res.error, type: 'error'});
            } 
            setIsLoading(false); 
        }
    }

    return (
        <FormContainer>
            <FormCustom onSubmit={onSubmit}>
                {message && 
                <Alert
                style={{width: '100%', marginBottom: '1rem'}}
                showIcon 
                message={message.msg}
                type={message.type}
                closable
                onClose={() => setMessage(null)}
                />
                }
                <Input
                required
                type="text"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Nome"
                value={inputs.nome}
                onChange={(e) => setInputs({nome: e.target.value})}
                />
                <Input
                required
                type="email"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="E-mail"
                value={inputs.email}
                onChange={(e) => setInputs({email: e.target.value})}
                />
                <TextArea
                allowClear
                required
                placeholder="Mensagem"
                autoSize={{ minRows: 5 }}
                value={inputs.mensagem}
                onChange={(e) => setInputs({mensagem: e.target.value})}
                />
                <Button className="main-button" loading={isLoading} type="primary" htmlType="submit">
                    {!isLoading? 'Enviar' : ''}
                </Button>
            </FormCustom>
        </FormContainer>
    );
}

export default Contato;