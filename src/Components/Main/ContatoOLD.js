import React, { Component } from 'react';
import App from '../../App';
import '../../css/Contato.css';

class Contato extends Component {
    render() {
        return (
            <App>
                <div className="card principalcontato">
                <section className="hero">
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        Contato
                    </h1>                   
                    </div>
                </div>
                </section>
                <div className="formulario">
                <form onSubmit={this.onSubmit}>
                    <div className="field ">
                        <label className="label ">Nome</label>
                        <div className="control">
                            <input className="input is-info" type="text" placeholder="Ex: Guilherme Paiva" name="nome" onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label ">Email</label>
                            <div className="control">
                                <input className="input" type="email" placeholder="exemplo@.com.br"/>  
                            </div>                      
                    </div>
                    <textarea className="textarea" placeholder="Informações"></textarea>
                        <button className="button is-info botaosalvar" type="submit">Enviar</button>
                    </form>
                </div>
                </div>
            </App>
        );
    }
}

export default Contato;