import React, { useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

function RecoveryForm () {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),{
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const history = useHistory();
    const params = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
            const res = await api.post('user/recoverypassword', {
                ...inputs,
                token: params.token
            });
    
            if(res.status === 200){
                history.replace('/login', {message: res.data.message});
            }else{
                setMessage(res.error);
                setIsLoading(false);
            }  
            
        }
    }

    return (
        <FormContainer>
            <FormCustom onSubmit={onSubmit}>
                {message && 
                <Alert
                style={{width: '100%', marginBottom: '1rem'}}
                showIcon 
                message={message}
                type="error"
                closable
                onClose={() => setMessage(null)}
                />
                }
                <Input
                required
                type="email"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="E-mail"
                value={inputs.email}
                onChange={(e) => setInputs({email: e.target.value})}
                />
                <Input
                required
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Senha"
                value={inputs.password}
                onChange={(e) => setInputs({password: e.target.value})}
                />
                <Input
                required
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirme a senha"
                value={inputs.passwordConfirm}
                onChange={(e) => setInputs({passwordConfirm: e.target.value})}
                />
                <Button className="main-button" loading={isLoading} type="primary" htmlType="submit">
                    {!isLoading? 'Recuperar senha' : ''}
                </Button>
            </FormCustom>
        </FormContainer>
    );
}

export default RecoveryForm;