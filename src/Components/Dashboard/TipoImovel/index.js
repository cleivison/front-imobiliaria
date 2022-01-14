import React, { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom';
import { Table, Divider, Popconfirm, message, Icon, Input } from 'antd';
import { api } from '../../../services/api';
import 'antd/es/table/style/css';
import 'antd/es/divider/style/css';
import 'antd/es/tag/style/css';
import 'antd/es/popconfirm/style/css';
import 'antd/es/message/style/css';
import 'antd/es/input/style/css';
import { ActionButtons, SearchContainer } from './styles';
const { Search } = Input;

function TipoImovel () {
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
        async function getTipoImovel() {
            setTablePagination({loading: true});
            const res = await api.get(
                `tipoimovel/pers?page=${
                    tablePagination.pagination.current
                }&pageSize=${
                    tablePagination.pagination.pageSize
                }&search=${
                    tablePagination.search
                }`
            );
            //console.log(res);
            if(res.status === 200){
                setTablePagination({data: res.data.tipoImovel, loading: false, pagination: {...tablePagination.pagination, total: res.data.count}});
            }else{
                message.error('Ocorreu um problema atualize a página!');
            }
        }
        getTipoImovel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tablePagination.requesting]);

    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
          title: 'Action',
          key: 'action',
          render: (tipoImovel) => (
            <ActionButtons>
              <a href={`tipoimovel/cadastrar/${tipoImovel.id}`} onClick={(e) => {
                e.preventDefault();
                history.push(`tipoimovel/cadastrar/${tipoImovel.id}`,{
                    tipoimovel: tipoImovel
                });
              }}>Editar</a>
              <Divider type="vertical" />
              <Popconfirm
                title={`Deseja realmente deletar o tipo de imóvel ${tipoImovel.descricao}?`}
                onConfirm={() => {handleDelete(tipoImovel.id)}}
                onCancel={() => {message.error('Operação cancelada!');}}
                okText="Sim"
                cancelText="Não"
                icon={<Icon type="delete" />}
            >
                <a href="tipoimovel" onClick={(e) => e.preventDefault()}>Delete</a>
            </Popconfirm>
            </ActionButtons>
          ),
          fixed: 'right',
          width: 150
        },
      ];

    const handleDelete = async (id) => {
        const res = await api.delete(`tipoimovel/${id}`);
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
                rowKey={record => record.id} 
                scroll={{ x: 300 }} 
                onChange={handleChange}
                loading={tablePagination.loading}
                pagination={tablePagination.pagination}
            />
        </div>
    );
}

export default TipoImovel;