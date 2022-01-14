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
    ${props => !props.noChild && 
    `
    div:first-child {
        width: 100%;
    }
    `}
    
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

export const ContratoImovelContainer= styled.div`
    width: 400px;
    padding-bottom: 1rem;

    .global-search {
    width: 100%;
    }

    .global-search.ant-select-auto-complete .ant-select-selection--single {
    margin-right: -46px;
    }

    .global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input:not(:last-child) {
    padding-right: 62px;
    height: 40px;
    }

    .global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 41px;
    }

    .global-search-item {
    display: flex;
    }

    .global-search-item-desc {
    flex: auto;
    text-overflow: ellipsis;
    overflow: hidden;
    }

    .global-search-item-count {
    flex: none;
    }

    .ant-select-selection__rendered {
        margin: 0;
    }
    
    .search-btn {
        margin-right: -36px;
    }
`;