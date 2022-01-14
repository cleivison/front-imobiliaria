import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

export const FormCustom = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: white;
    padding: 5rem;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    max-width: 760px;
    input {
        height: 3rem;
    }

    .ant-input-affix-wrapper {
        margin-bottom: 1rem;
    }

    a {
        margin-top: 1rem;
    }

    .main-button {
        width: 100%;
        height: 3rem;
        font-size: 1.2rem;
    }

    @media (max-width: 844px) {
        padding: 1rem;
        margin: 0 1rem;
    }
`;