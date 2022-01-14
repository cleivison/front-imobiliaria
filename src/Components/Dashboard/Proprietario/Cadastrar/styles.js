import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: ${props => props.justifyContent? props.justifyContent : 'space-between'};
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.2);
    ${props => props.after && 
    `::after {
        content: '';
        height: 0;
        flex-grow: 1;
    }`
    }
`;

export const Col = styled.div`
    display: flex;
    justify-content: center;
    width: ${props => props.width? props.width : '24'}%;
    min-width: 280px;
    margin: 0.5rem;
    margin-bottom: 1rem;
    
    div:first-child {
        width: 100%;
    }
    ${props => props.width || 
    `@media (max-width: 1878px){
        width: 30%
    }

    @media (max-width: 1167px){
        width: 46%;
    }

    @media (max-width: 872px){
        width: 100%;
    }`
    }
`;
