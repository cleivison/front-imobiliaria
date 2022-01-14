import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Input, Button, Alert } from 'antd';
import { api, saveUser } from '../../../services/api';
import 'antd/es/alert/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/button/style/css';
import 'antd/es/input/style/css';
import {
    LoginContainer,
    FormCustom
}from './styles';

function Login () {
    const history = useHistory();
    const [message, setMessage] = useState({
        msg: history.location.state? history.location.state.message : null,
        type: history.location.state? 'success' : 'error'
    });
    const [isLoading, setIsLoading] = useState(false);

    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),{
        email: '',
        password: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
            const res = await api.post('user/login', inputs);
    
            if(res.status === 200){
                saveUser({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    token: res.data.token
                });
                history.push('/dashboard');
            }else{
                setMessage({
                    msg: res.error,
                    type: 'error'
                });
                setIsLoading(false);
            }  
        }
    }

    return (
        <LoginContainer>
            <FormCustom onSubmit={onSubmit}>
                {message.msg && 
                <Alert
                style={{width: '100%', marginBottom: '1rem'}}
                showIcon 
                message={message.msg}
                type={message.type}
                closable
                onClose={() => setMessage({...message, msg: null})}
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
                <Button loading={isLoading} className="main-button" type="primary" htmlType="submit">
                {!isLoading? 'Login' : '' }
                </Button>
                <a href="/recuperar" onClick={(e) => {
                    e.preventDefault();
                    history.push('/recuperar');
                }}>
                    Esqueceu sua senha?
                </a>
            </FormCustom>
        </LoginContainer>
    );
}

export default Login;