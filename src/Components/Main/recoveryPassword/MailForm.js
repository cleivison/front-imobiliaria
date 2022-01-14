import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

function MailForm () {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
            const res = await api.post('user/forgotpassword', {
                email,
                front_url: `${window.location.origin}/recuperar/`
            });
    
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
                type="email"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Button className="main-button" loading={isLoading} type="primary" htmlType="submit">
                    {!isLoading? 'Enviar e-mail' : ''}
                </Button>
                <a href="/login" onClick={(e) => {
                    e.preventDefault();
                    history.push('/login');
                }}>
                    Retornar para a janela de login
                </a>
            </FormCustom>
        </FormContainer>
    );
}

export default MailForm;