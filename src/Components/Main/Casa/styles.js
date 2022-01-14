import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 900px) {
        div:nth-child(2) { order: 1; }
    }
`;

export const Col = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 48%;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

export const Descricao = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0.5rem;
    width: 100%;

    div {
        margin: auto;
    }
`;

export const Sobre = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0rem 0.5rem 1.5rem 2rem;
    width: 100%;
    p {
        padding-left: 2.5rem;
        text-align: start;
        width: 100%;
        font-size: 1rem;
    }
`;

export const SobreIcon = styled.div`
    display: inline-flex;
    align-items: center;
    i {
        padding: 0.5rem;
        font-size: 1.5rem;
    }
    h3 {
        font-size: 1.5rem;
        margin: 0;
    }
`;

export const Endereco = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 80%;

    p {
        font-size: 1.5rem;
        margin: 0;
        padding: 0.4rem;
    }
`;

export const Celulas = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;

    img {
        height: ${props => props.tamanho}px;
        width: ${props => props.tamanho}px;
        margin-bottom: 0.5rem;
    }
    p {
        width: 100%;
    }
`;

export const CarouselContainer = styled.div`
    display: flex;
    width: 100%;
    margin: auto;
    margin-top: 30px;

    div:first-child {
        width: 100%;
        li img {
            object-fit: scale-down;
            max-height: 800px;
        }
    }
`;

export const ExtraContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    background-color: ghostwhite;
    padding: 2rem;
    font-size: 2rem;
    align-items: center;

    div {
        display: flex; 
        flex-wrap: wrap; 
        align-items: center;
        margin: 0;
        margin-right: auto;
        p {
            width: 100%;
        }
        p:last-child {
            opacity: .7;
        }
    }
    p {
        margin: 0;
    }
    last-child {
        text-align: end;
    }
    @media (max-width: 600px) {
        font-size: 1.5rem;
    }
`;

export const ContatoContainer = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center; 
    align-items: center; 
    padding: 1rem; 
    font-size: 1.5rem; 
    background-color: ghostwhite;
    border-top: 3px solid rgba(0,0,0,0.2);
    p {
        width: 100%;
        img {
            width: 36px;
        }
        i {
            font-size: 1.8rem;
        }
    }
`;