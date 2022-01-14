import React from 'react';
import App from '../../App';
import '../../css/Radiestesia.css';
//import sefirotimage from '../../Image/sefirot.png';

const Radiestesia = props => {

    return (
        <App>
            <div className="card principalradiestesia">                
                <div className="artigos">
                <article className="message is-dark artigos">
                    <div className="message-header">
                        <p>Etimologia</p>
                       
                    </div>
                    <div className="message-body texto">
                        As palavras radioestesia e radiestesia são <strong>neologismos</strong> construídos a partir de dois termos: o latino radium, 
                        "radiação", e o grego αἴσθησις [aísthesis], "percepção pelos sentidos". No passado usava-se também o termo 
                        rabdomancia, formado pelos termos gregos ῥάβδος, "vara" ou "verga", e μαντεία "adivinhação".
                    </div>
                    
                </article>
                </div>

                <article className="message is-dark artigos">
                    <div className="message-header">
                        <p>Dados históricos</p>
                        
                    </div>
                    <div className="message-body texto">
                        <p className="paragrafo">Os primeiros pêndulos foram encontrados no Egito, no <strong>Vale dos Reis.</strong> Há cerca de 2000 anos antes da nossa era, chineses radiestesistas já se utilizavam da arte do pêndulo para encontrar fontes da água, minérios e a usavam também na agricultura.</p>
                        <p className="paragrafo">No século XVIII, em <strong>1780</strong>, os médicos Dr. Thouvenel e Dr. Bleton escrevem o livro "Memória física e medicinal", demonstrando as relações entre a forquilha, o magnetismo e a eletricidade.</p>
                        <p className="paragrafo">Em <strong>1890</strong>, os abades Mermet e Bouly usaram pela primeira vez o termo radiestesia.</p>
                        <p className="paragrafo">Em 1929 é criada a Associação Francesa dos Amigos da Radioestesia, que contava com a participação de vários cientistas das melhores academias de ciências da época. Desde então esta ciência tem ganhado inúmeros adeptos, crescendo muito no domínio da <strong>medicina</strong>, da <strong>psicologia</strong>, na harmonização de casas e terrenos.</p>
                        <p className="paragrafo">Segundo a Radioestesia existe um <strong>campo magnético terrestre</strong> que provoque um <strong>radiação</strong>, que possam mover na terra certas linhas ou <strong>correntes telúricas</strong> como se fossem uma rede a fazer cruzamentos entre elas, originando a teoria das Linhas de Ley assim como das linhas Hartmann e Curry, estudadas por Ernst Hartmann e Manfred Curry respectivamente, que possam ter influência em todos os seres vivos.</p>
                    </div>
                </article>
            </div>
        </App>
    );
}

export default Radiestesia;