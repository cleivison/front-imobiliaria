import React from 'react';
import App from '../../App';
import '../../css/Curso.css';

const Curso = props => {

    return (
        <App>
            <div className="card principalcurso">
                <article className="message is-dark">
                    <div className="message-header">
                        <p>Introdução</p>
                        
                    </div>
                    <div className="message-body">
                        Descricao sobre o Curso.
                    </div>
                </article>
            </div>
        </App>
    );
}

export default Curso;