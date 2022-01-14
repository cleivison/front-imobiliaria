import React, { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom';
import { Table, Divider, Popconfirm, message, Icon, Input } from 'antd';
import { api } from '../../../services/api';
import 'antd/es/table/style/css';
import 'antd/es/divider/style/css';
import 'antd/es/popconfirm/style/css';
import 'antd/es/message/style/css';
import 'antd/es/input/style/css';
import { ActionButtons, SearchContainer } from './styles';
const { Search } = Input;
function ContratoImovel () {
    const [tablePagination, setTablePagination] = useReducer((state, newState) => ({...state,...newState}),
        {
            pagination: {current: 1, pageSize: 10, total: 0},
            loading: false,
            data: [],
            requesting: false,
            search: ''
        }
    );

    const history = useHistory();
    const { state } = history.location;

    if(state !== undefined && state.mensagem !== null){
        message.success(state.mensagem);
        history.replace({ ...history.location, state: undefined });
    }

    useEffect(() => {
        async function getImoveis() {
            setTablePagination({loading: true});

            const res = await api.get(
                `contratoimovel?page=${
                    tablePagination.pagination.current
                }&pageSize=${
                    tablePagination.pagination.pageSize
                }&search=${
                    tablePagination.search
                }`
            );
           
            if(res.status === 200){                
                setTablePagination({data: res.data.contratoimoveis, loading: false, pagination: {...tablePagination.pagination, total: res.data.count}});
            }else{                    
                console.log('teste',res);       
                //message.error('Ocorreu um problemdasdasdasa atualize a página!');                          
            }
        }
        getImoveis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tablePagination.requesting]);

    const columns = [
        {
            title: 'Inquilino',
            dataIndex: 'Inquilino.nome',
            key: 'inquilino',
            width: 270
        },
        {
            title: 'Proprietário',
            dataIndex: 'Imovel',
            key: 'Proprietario',
            render: (Imovel) => (
               
                <p>{`${Imovel.Proprietario.nome}`}</p>
            ),
            width: 200,           
        },
        {
            title: 'Data do contrato',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (data_inicio) => (
                <p>               
                {`${
                    data_inicio[8]+data_inicio[9]+'/'+
                    data_inicio[5]+data_inicio[6]+'/'+
                    data_inicio[0]+data_inicio[1]+data_inicio[2]+data_inicio[3]
                }`}                
                </p>
            ),
        },        
        {
            title: 'Endereço',
            dataIndex: 'Imovel',
            key: 'endereco',
            render: (Imovel) => (
               
                <p>{`${Imovel.Endereco.rua}, ${Imovel.Endereco.numero}, ${Imovel.Endereco.bairro} - ${Imovel.Endereco.cep}`}</p>
            )
        },
        {
            title: 'Valor do aluguel',
            dataIndex: 'valor_aluguel',
            key: 'valor_aluguel',
        },               
        {
          title: 'Action',
          key: 'action',
          render: (contratoimovel) => (
            <ActionButtons>
              <a href={`contratoimovel/recibos/${contratoimovel.id}`} onClick={(e) => {
                e.preventDefault();
                history.push(`contratoimovel/recibos/${contratoimovel.id}`);
              }}>Recibo</a>               
              <Divider type="vertical" />  
              <a href={`contratoimovel/cadastrar/${contratoimovel.id}`} onClick={(e) => {
                e.preventDefault();
                history.push(`contratoimovel/cadastrar/${contratoimovel.id}`,{
                    contratoimovel: contratoimovel
                });
              }}>Editar</a>
              <Divider type="vertical" />
              <Popconfirm
                title={`Deseja realmente deletar o Contrato de Id ${contratoimovel.id}?`}
                onConfirm={() => {handleDelete(contratoimovel.id)}}
                onCancel={() => {message.error('Operação cancelada!');}}
                okText="Sim"
                cancelText="Não"
                icon={<Icon type="delete" />}
            >
                <a href="contratoimovel" onClick={(e) => e.preventDefault()}>Delete</a>
            </Popconfirm>
            </ActionButtons>
          ),
          fixed: 'right',
          width: 200
        },
      ];

    const handleDelete = async (id) => {
        const res = await api.delete(`contratoimovel/${id}`);
        if(res.status === 200){
            let current = tablePagination.pagination.current;
            if(tablePagination.data.length === 1 && current > 1){
                current--;
            }
            message.success(res.data.message);
            setTablePagination({pagination: {...tablePagination.pagination, current: current} ,requesting: !tablePagination.requesting});
        }else{
            message.error(res.error);
        }
    }

    const handleChange = (pagination) => {
        setTablePagination({pagination: pagination, requesting: !tablePagination.requesting});
    }

    return (
        <div>
            <SearchContainer>
                <Search
                    placeholder="Procure aqui..."
                    onSearch={value => setTablePagination({search: value, pagination: {...tablePagination.pagination, current: 1}, requesting: !tablePagination.requesting})}
                    style={{ width: 300 }}
                />
            </SearchContainer>
            <Table 
                columns={columns} 
                dataSource={tablePagination.data} 
                rowKey={record => record.codigo} 
                scroll={{ x: 1000 }} 
                onChange={handleChange}
                loading={tablePagination.loading}
                pagination={tablePagination.pagination}
            />
        </div>
    );
}

export default ContratoImovel;