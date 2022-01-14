import styled from 'styled-components';
//import { Carousel } from 'antd';

export const RowPesquisa = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
`;

export const ColPesquisa = styled.div`
    display: flex;
    width: auto;
    padding: 10px 10px;
    
    @media(max-width: 550px){
        justify-content: center;
        width: 100%;

        .select {
            width: 100%;
            select {
                width: 100%;
            }
        }

    }
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
`;

export const Col = styled.div`
    display: flex;
    width: 48%;
    padding: 20px 0;

    .card {
        width: 100%;
    }

    @media(max-width: 800px){
        width: 100%;
    }
`;

export const Descricao = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 1.5rem 0.5rem 0 0.5rem;
`;

export const Endereco = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 80%;

    p {
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

export const Detalhes = styled.div`
    margin: 1rem 0;
`;

export const CarouselContainer = styled.div`
    display: flex; 
    div {
        min-height: 300px;
        width: 100%;
    }
    img {
        width: 100%;
        object-fit: scale-down;
        max-height: 440px;
        height: 100%;
        background: black;
    }
    /* div:first-child {
        width: 100%;
        li img {
            object-fit: scale-down;
            max-height: 440px;
        }
    } */
`;

/* CÓDIGO QUE NÃO ESTÁ SENDO UTILIZADO */

// export const CarouselCustom = styled(Carousel)`
   
//     img {
//         width: 100%;   
//         height: auto;
//         padding: 0px 0px;          
//     }
// `;

// export const Arrow = styled.i`
//     width: 20px;
//     height: 20px;
//     box-sizing: border-box;
//     border: solid black;
//     border-width: 0 3px 3px 0;
//     display: inline-block;
//     padding: 3px;
//     position: relative;
//     ${props => props.right?
//     `
//     transform: rotate(-45deg);
//     right: 3px;
//     `
//     :
//     `
//     transform: rotate(135deg);
//     left: 3px;
//     `
//     }
// `;