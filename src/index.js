import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
// import Curso from './Components/Main/Curso';
// import Radiestesia from './Components/Main/Radiestesia';
import * as serviceWorker from './serviceWorker';
import Home from './Components/Main/Home';
import Sobre from './Components/Main/Sobre';
import Contato from './Components/Main/Contato';
import Casa from './Components/Main/Casa';
import Login from './Components/Main/Login';
import MailForm from './Components/Main/recoveryPassword/MailForm';
import RecoveryForm from './Components/Main/recoveryPassword/RecoveryForm';
import Dashboard from './Components/Dashboard';
import DashHome from './Components/Dashboard/DashHome';
import Imoveis from './Components/Dashboard/Imoveis';
import TipoImovel from './Components/Dashboard/TipoImovel';
import Proprietario from './Components/Dashboard/Proprietario';
import Inquilino from './Components/Dashboard/Inquilino';
import ContratoImovel from './Components/Dashboard/ContratoImovel';
import CadastrarContratoimovel from './Components/Dashboard/ContratoImovel/Cadastrar';
import Reciboscontrato from './Components/Dashboard/ContratoImovel/Recibos';
import CadastrarImovel from './Components/Dashboard/Imoveis/Cadastrar';
import CadastrarTipoImovel from './Components/Dashboard/TipoImovel/Cadastrar';
import CadastrarProprietario from './Components/Dashboard/Proprietario/Cadastrar';
import CadastarInquilino from './Components/Dashboard/Inquilino/Cadastrar';
import { PrivateRoute, LoginRoute } from './Components/PrivateRoutes';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={() => <App><Home /></App>}/>   
            <Route path="/casa/:id" exact={true} component={Casa}/>
            <Route 
                path="/recuperar" 
                exact={true} 
                component={() => <App hideFooter hideMain><MailForm /></App>}
            />
            <Route 
                path="/recuperar/:token" 
                exact={true} 
                component={() => <App hideFooter hideMain><RecoveryForm /></App>}
            />
            <LoginRoute 
                path="/login" 
                exact={true}
                component={() => <App hideFooter hideMain><Login /></App>}
            />
            <PrivateRoute 
                path="/dashboard" 
                exact={true}
                component={() => <Dashboard><DashHome /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/imoveis" 
                exact={true}
                component={() => <Dashboard><Imoveis /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/imoveis/cadastrar/:id?" 
                exact={true}
                component={() => <Dashboard key={Date.now()}><CadastrarImovel /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/tipoimovel" 
                exact={true}
                component={() => <Dashboard><TipoImovel /></Dashboard>}
            />           
            <PrivateRoute 
                path="/dashboard/tipoimovel/cadastrar/:id?" 
                exact={true}
                component={() => <Dashboard key={Date.now()}><CadastrarTipoImovel /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/proprietarios" 
                exact={true}
                component={() => <Dashboard><Proprietario /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/proprietarios/cadastrar/:id?" 
                exact={true}
                component={() => <Dashboard key={Date.now()}><CadastrarProprietario /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/inquilinos" 
                exact={true}
                component={() => <Dashboard><Inquilino /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/inquilinos/cadastrar/:id?" 
                exact={true}
                component={() => <Dashboard key={Date.now()}><CadastarInquilino /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/contratoimovel" 
                exact={true}
                component={() => <Dashboard><ContratoImovel /></Dashboard>}
            />
            <PrivateRoute 
                path="/dashboard/contratoimovel/cadastrar/:id?" 
                exact={true}
                component={() => <Dashboard key={Date.now()}><CadastrarContratoimovel /></Dashboard>}
            />            
            <PrivateRoute 
                path="/dashboard/contratoimovel/recibos/:id?" 
                exact={true}
                component={() => <Dashboard key={Date.now()}><Reciboscontrato /></Dashboard>}
            />
            
            <Route path="/alugar" exact={true} component={() => <App hideMain><Home alugar /></App>}/>
            <Route path="/comprar" exact={true} component={() => <App hideMain><Home comprar /></App>}/>
            {/* <Route path="/curso" exact={true} component={Curso}/>  
            <Route path="/assuntos/radiestesia" exact={true} component={Radiestesia}/> */}
            <Route path="/sobre" exact={true} component={Sobre}/>     
            <Route path="/contato" exact={true} component={() => <App hideMain><Contato /></App>}/>
            <Route component={() => 
                <App hideMain>
                    <div style={{
                        height: '100vh', 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem'
                    }}>
                        Erro 404: esta página não existe!
                    </div>
                </App>
            }
            />     
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();