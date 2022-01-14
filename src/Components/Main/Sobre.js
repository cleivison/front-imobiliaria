import React from 'react';
import App from '../../App';
import wpcorretores from '../../Image/logo3.png';

const Sobre = () => {
    return (
        <App>
            <div className="card principalhome">
             
             <article className="media">
                <figure className="media-left image is-128x128">
                   
                    <img className="is-rounded" src={wpcorretores} alt="Ilustração" />
                    
                </figure>
                <div className="media-content">
                    <div className="content">
                    <p>
                        <strong>Wp Corretores</strong>
                        <br/>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    </div>
                    <nav className="level is-mobile">
                    <div className="level-left">
                        <a className="level-item" href="sobre" onClick={(e) => e.preventDefault()}>
                        <span className="icon is-small"><i className="fas fa-reply"></i></span>
                        </a>
                        <a className="level-item" href="sobre" onClick={(e) => e.preventDefault()}>
                        <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                        </a>
                        <a className="level-item" href="sobre" onClick={(e) => e.preventDefault()}>
                        <span className="icon is-small"><i className="fas fa-heart"></i></span>
                        </a>
                    </div>
                    </nav>
                </div>
               
                </article>
            </div>
        </App>
    );
};

export default Sobre;