import whatsapp from '../Icon/whatsapp.png';
//import telefone from '../Icon/telefone.png';
import logo2 from '../Icon/logo2.png';
import '../css/Header.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';
import { Icon } from 'antd';

class Header extends Component {

    state = {
        active: true,
    }

    render(){
        return (
            <div className="card principalheader">
                
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">  
                    <Link className="navbar-item" to="/">
                    <img src={logo2} width="130" height="28" alt="Logo"/>
                    </Link>                                        
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            this.setState({active: !this.state.active});
                        }} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">                                          
                       
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className={this.state.active ? "navbar-menu" : "navbar-menu is-active"}>
                        <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            <strong>Home</strong>
                        </Link>

                        <Link to="/alugar" className="navbar-item">
                            <strong>Alugar</strong>
                        </Link>

                        <Link to="/comprar" className="navbar-item">
                            <strong>Comprar</strong>
                        </Link>
                        
                        <Link to="/sobre" className="navbar-item">
                            <strong>Sobre</strong>
                        </Link>
                        <Link to="/contato" className="navbar-item">
                            <strong>Contato</strong>
                        </Link>
                    </div>

                        <div className="navbar-end">
                        <div className="navbar-item">
                            
                            <p className="icones">
                                <img alt="whatsapp" src={whatsapp}/> (34) 9 8827-5080
                            </p>                           
                                                     
                        </div>
                        <div className="navbar-item">
                            
                            <p className="icones">
                                <Icon type="phone" theme="twoTone" /> (34) 3312-2748                                
                            </p>                           
                                                     
                        </div>
                        </div>
                    </div>
                    </nav>
            </div>
        );   
    } 
}

export default Header;